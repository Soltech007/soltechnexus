import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const baseUrl = process.env.MAUTIC_BASE_URL;
    const username = process.env.MAUTIC_USERNAME;
    const password = process.env.MAUTIC_PASSWORD;

    if (!baseUrl || !username || !password) {
      console.error("🚨 Mautic env vars missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    const response = await fetch(`${baseUrl}/api/contacts/new`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        tags: ["Soltech_nexus_subscriber_button"],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("🚨 Mautic Error:", data);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully! 🎉" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Newsletter Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
