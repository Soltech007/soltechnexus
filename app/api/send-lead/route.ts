import { NextRequest, NextResponse } from "next/server";

const ERP_CONFIG = {
  url: "https://erp.soltechtechservices.com",
  apiKey: "8c21c94e1a2879b",
  apiSecret: "3caa5d67879d169",
} as const;

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, '').trim();
}

function parseErrorMessage(data: any): string {
  let errorMessage = "Failed to create lead";
  if (data._server_messages) {
    try {
      const messages = JSON.parse(data._server_messages);
      const parsed = JSON.parse(messages[0]);
      errorMessage = stripHtml(parsed.message || errorMessage);
    } catch (e) { 
      console.error("Parse error:", e); 
    }
  } else if (data.exception) {
    errorMessage = stripHtml(data.exception);
  } else if (data.message) {
    errorMessage = stripHtml(data.message);
  }
  return errorMessage;
}

// Source create karne ka function
async function ensureLeadSourceExists(sourceName: string) {
  if (!sourceName) return;
  try {
    const response = await fetch(`${ERP_CONFIG.url}/api/resource/Lead Source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify({ source_name: sourceName }),
    });
    console.log("Source creation response:", response.status);
  } catch (error) {
    console.log("Source check skipped:", error);
  }
}

export async function POST(req: NextRequest) {
  console.log("🚀 API Route Called");
  
  try {
    const body = await req.json();
    console.log("📥 Received Body:", JSON.stringify(body, null, 2));

    // Validation
    if (!body.firstName || !body.email) {
      console.log("❌ Validation Failed: Name/Email required");
      return NextResponse.json(
        { success: false, error: "Name and Email are required" }, 
        { status: 400 }
      );
    }

    // Source (Page Name)
    const pageSource = body.source || body.servicePage || body.productPage || "Website";
    console.log("📋 Page Source:", pageSource);

    // Check/Create Source
    await ensureLeadSourceExists(pageSource);

    // Prepare Payload
    const payload = {
      first_name: body.firstName || "",
      last_name: body.lastName || "",
      lead_name: `${body.firstName || ""} ${body.lastName || ""}`.trim(),
      email_id: body.email || "",
      company_name: body.company || "",
      source: "Website",
      custom_lead_interest: "SOLTECH Nexus",
      industry: body.industry || "",
      custom_redirect_form: pageSource,
      lead_source_details: `
Page: ${pageSource}
Message: ${body.message || 'N/A'}
Employees: ${body.noOfEmployees || 'N/A'}
Website: ${body.website || 'N/A'}
Location: ${body.city || 'N/A'}, ${body.state || 'N/A'}
      `.trim(),
      status: "Lead",
      mobile_no: body.phone || "",
      city: body.city || "",
      state: body.state || "",
      lead_owner: "lead@Bizaihacks.com",
    };

    console.log("📤 Sending to ERP:", JSON.stringify(payload, null, 2));

    // Send to ERP
    const response = await fetch(`${ERP_CONFIG.url}/api/resource/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("📬 ERP Response Status:", response.status);

    const data = await response.json();
    console.log("📬 ERP Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      const errorMsg = parseErrorMessage(data);
      console.error("❌ ERP Error:", errorMsg);
      return NextResponse.json(
        { success: false, error: errorMsg, details: data }, 
        { status: response.status }
      );
    }

    console.log("✅ Lead Created Successfully!");
    return NextResponse.json(
      { 
        success: true, 
        message: "Lead created successfully",
        data: data 
      }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Server Error", 
        message: error.message 
      }, 
      { status: 500 }
    );
  }
}

// OPTIONS for CORS
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}