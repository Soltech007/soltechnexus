import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import BlogPostClient from "./BlogPostClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

interface PageProps {
  params: { slug: string };
}

// Fetch Single Blog
async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;
  return data;
}

// Related blogs
async function getRelatedBlogs(category: string, currentId: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .neq("id", currentId)
    .limit(3);

  return data || [];
}

export async function generateMetadata({ params }: PageProps) {
  const blog = await getBlog(params.slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Soltech`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featured_image || ""],
      url: `/blog/${blog.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const blog = await getBlog(params.slug);

  if (!blog) notFound();

  // Increment views safely
  try {
    await supabase.rpc("increment_blog_view", { blog_id: blog.id });
  } catch {
    await supabase
      .from("blogs")
      .update({ views: (blog.views || 0) + 1 })
      .eq("id", blog.id);
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.id);

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
}
