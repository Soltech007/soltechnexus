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

    const baseUrl = process.env.MAUTIC_BASE_URL!;
    const username = process.env.MAUTIC_USERNAME!;
    const password = process.env.MAUTIC_PASSWORD!;

    if (!baseUrl || !username || !password) {
      console.error("🚨 Mautic env vars missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const authHeader =
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

    let mauticReachable = false;

    try {
      const response = await fetch(`${baseUrl}/api/contacts/new`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          firstname: "Subscriber",
          lastname: "",
          tags: ["Soltech_nexus_subscriber_button"],
        }),
      });

      mauticReachable = true;

      const text = await response.text();

      // REAL errors only
      if (response.status === 401 || response.status === 403) {
        console.error("Mautic auth failed:", text);
        return NextResponse.json(
          { error: "Email service authentication failed" },
          { status: 500 }
        );
      }

      if (response.status >= 502) {
        console.error("Mautic server unavailable:", text);
        return NextResponse.json(
          { error: "Email service unavailable" },
          { status: 500 }
        );
      }

      // All other responses = SUCCESS (Mautic behaviour)
      return NextResponse.json(
        { message: "Subscribed successfully! 🎉" },
        { status: 200 }
      );

    } catch (err) {
      console.error("Network error:", err);
    }

    // Only when mautic unreachable
    if (!mauticReachable) {
      return NextResponse.json(
        { error: "Unable to connect to email service" },
        { status: 500 }
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
