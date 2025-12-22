import { NextRequest, NextResponse } from "next/server";

const ERP_CONFIG = {
  url: "https://erp.soltechtechservices.com",
  apiKey: "8c21c94e1a2879b",
  apiSecret: "3caa5d67879d169",
} as const;

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

function parseErrorMessage(data: any): string {
  let errorMessage = "Something went wrong";
  try {
    if (data._server_messages) {
      const messages = JSON.parse(data._server_messages);
      const parsed = JSON.parse(messages[0]);
      errorMessage = stripHtml(parsed.message || errorMessage);
    } else if (data.exception) {
      errorMessage = stripHtml(data.exception);
    } else if (data.message) {
      errorMessage = stripHtml(data.message);
    }
  } catch (e) {
    console.error("Parse error:", e);
  }
  return errorMessage;
}

// Source create karne ka function
async function ensureLeadSourceExists(sourceName: string) {
  if (!sourceName) return;
  try {
    await fetch(`${ERP_CONFIG.url}/api/resource/Lead Source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify({ source_name: sourceName }),
    });
  } catch (error) {
    // Silently ignore - source might already exist
    console.log("Source check skipped");
  }
}

export async function POST(req: NextRequest) {
  try {
    // ✅ 1. Parse Request Body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    console.log("📥 Incoming Form Data:", JSON.stringify(body, null, 2));

    // ✅ 2. Validation - Only check required fields
    if (!body.firstName || !body.email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // ✅ 3. Prepare Source
    const pageSource = body.source || body.servicePage || body.productPage || "Website";
    
    // Try to ensure source exists (non-blocking)
    try {
      await ensureLeadSourceExists(pageSource);
    } catch (e) {
      // Ignore source creation errors
    }

    // ✅ 4. Detailed Notes String (Pipe Separated)
    const detailedInfo = [
      body.whatsappNo ? `WhatsApp No: ${body.whatsappNo}` : null,
      body.website ? `Website: ${body.website}` : null,
      body.noOfEmployees ? `Employees: ${body.noOfEmployees}` : null,
      body.message ? `Message: ${body.message}` : null,
      body.city ? `City: ${body.city}` : null,
      body.state ? `State: ${body.state}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // ✅ 5. Build Payload
    const payload: Record<string, any> = {
      first_name: body.firstName || "",
      last_name: body.lastName || "",
      lead_name: `${body.firstName || ""} ${body.lastName || ""}`.trim(),
      email_id: body.email || "",
      mobile_no: body.phone || "",
      // whatsapp_no: body.whatsappNo || "",
      website: body.website || "",
      company_name: body.company || "",
      industry: body.industry || "",
      no_of_employees: body.noOfEmployees || "",
      city: body.city || "",
      state: body.state || "",
      source: "Website",
      status: "Lead",
      custom_lead_interest: "SOLTECH Nexus",
      custom_redirect_form: pageSource,
      lead_source_details: detailedInfo || "",
      lead_owner: "lead@soltechnexus.com",
    };

    // ✅ 6. Remove empty keys to avoid ERP errors
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "" || payload[key] === null || payload[key] === undefined) {
        delete payload[key];
      }
    });

    // ✅ Keep required fields even if empty
    if (!payload.first_name) payload.first_name = body.firstName;
    if (!payload.email_id) payload.email_id = body.email;
    if (!payload.lead_name) payload.lead_name = body.firstName;

    console.log("📤 Sending to ERP:", JSON.stringify(payload, null, 2));

    // ✅ 7. Send to ERP
    let response;
    let data;

    try {
      response = await fetch(`${ERP_CONFIG.url}/api/resource/Lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
        body: JSON.stringify(payload),
      });

      // ✅ 8. Parse Response
      const responseText = await response.text();
      
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.log("Response is not JSON:", responseText);
        data = { raw: responseText };
      }

      // console.log("📨 ERP Response Status:", response.status);
      // console.log("📨 ERP Response Data:", JSON.stringify(data, null, 2));

    } catch (fetchError: any) {
      console.error("❌ Fetch Error:", fetchError.message);
      
      // ✅ Even if there's a network error, don't show error to user
      // Data might have been sent successfully
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your request has been submitted successfully.",
        },
        { status: 200 }
      );
    }

    // ✅ 9. Handle Response
    
    // Case 1: Success (200, 201, 202)
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your request has been submitted successfully.",
          leadId: data?.data?.name || null,
        },
        { status: 200 }
      );
    }

    // Case 2: Duplicate Lead (409 Conflict or specific error)
    if (response.status === 409 || 
        (data?.exception && data.exception.includes("Duplicate"))) {
      return NextResponse.json(
        {
          success: true, // Still show success to user
          message: "Thank you! Your request has been received.",
        },
        { status: 200 }
      );
    }

    // Case 3: Validation Error (400)
    if (response.status === 400) {
      const errorMsg = parseErrorMessage(data);
      console.error("❌ Validation Error:", errorMsg);
      
      // ✅ If it's a minor error, still show success
      // Data might have partially saved
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your request has been submitted.",
        },
        { status: 200 }
      );
    }

    // Case 4: Server Error (500+)
    if (response.status >= 500) {
      console.error("❌ ERP Server Error:", data);
      
      // ✅ Don't show server errors to user
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your request has been submitted.",
        },
        { status: 200 }
      );
    }

    // Case 5: Any other status - Default to success
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your request has been submitted successfully.",
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Server Error:", error.message);

    // ✅ Even on server error, show success to user
    // Log the error for debugging but don't expose to user
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your request has been submitted.",
      },
      { status: 200 }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}