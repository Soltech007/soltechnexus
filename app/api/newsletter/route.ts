// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = Number(process.env.BREVO_LIST_ID);

    if (!API_KEY) {
      console.error("🚨 BREVO_API_KEY is missing!");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (!LIST_ID) {
      console.error("🚨 BREVO_LIST_ID is missing!");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const payload = {
      email,
      listIds: [LIST_ID],
      updateEnabled: true,
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": API_KEY.trim(),
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("📩 Brevo Response:", response.status, text);

    // Success cases
    if (response.status === 201 || response.status === 204) {
      return NextResponse.json(
        { message: "Subscribed successfully! 🎉" },
        { status: 200 }
      );
    }

    // Handle duplicate contact (already exists)
    if (response.status === 400) {
      try {
        const errorData = JSON.parse(text);
        if (errorData.code === "duplicate_parameter" || text.includes("Contact already exist")) {
          return NextResponse.json(
            { error: "You're already subscribed! 📧" },
            { status: 409 } // Conflict status
          );
        }
      } catch {
        // If parsing fails, continue to generic error
      }
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: response.status }
    );
  } catch (error) {
    console.error("🔥 Newsletter Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}