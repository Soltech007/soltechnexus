import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Environment variable se current website ID lo
// Soltech360 par ye 'soltech360' hoga, BizAI par 'bizaihacks'
const CURRENT_WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || 'default';

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase credentials missing');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// GET blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const limit = searchParams.get('limit');
    const category = searchParams.get('category');
    
    // 👇 Admin check: Kya ye request Admin panel se hai?
    const isAdminRequest = searchParams.get('admin') === 'true';
    const filterWebsite = searchParams.get('website');

    const supabase = createAdminClient();

    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    // 👇 MAIN LOGIC: Website Filter
    if (isAdminRequest) {
      // ADMIN: Agar specific website filter manga hai to wo dikhao
      if (filterWebsite && filterWebsite !== 'all') {
        query = query.eq('website', filterWebsite);
      }
      // Agar 'all' hai to sab dikhao (No filter)
    } else {
      // FRONTEND: Sirf CURRENT website ka data dikhao
      // Ye line data mix hone se rokegi
      query = query.eq('website', CURRENT_WEBSITE_ID);
    }

    if (published === 'true') {
      query = query.eq('is_published', true);
    }

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const blogData = {
      title: body.title.trim(),
      slug: body.slug.trim(),
      excerpt: body.excerpt?.trim() || '',
      content: body.content,
      featured_image: body.featured_image || null,
      category: body.category?.trim() || 'General',
      tags: body.tags || [],
      author: body.author?.trim() || 'Admin',
      is_published: Boolean(body.is_published),
      // 👇 IMPORTANT: Form se aayi hui website ID save karo
      website: body.website || CURRENT_WEBSITE_ID,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blogs')
      .insert([blogData])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A blog with this slug already exists for this website' },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}