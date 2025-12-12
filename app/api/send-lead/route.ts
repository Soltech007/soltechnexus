import { NextRequest, NextResponse } from "next/server";

const ERP_CONFIG = {
  url: "https://erp.soltechtechservices.com", // No trailing slash
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
    await fetch(`${ERP_CONFIG.url}/api/resource/Lead Source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify({ source_name: sourceName }),
    });
  } catch (error) {
    console.log("Source check skipped");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Incoming Form Data:", JSON.stringify(body, null, 2));

    if (!body.firstName || !body.email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required" }, 
        { status: 400 }
      );
    }

    const pageSource = body.source || body.servicePage || body.productPage || "Website";
    await ensureLeadSourceExists(pageSource);

    // ✅ Detailed Notes String (Pipe Separated)
    const detailedInfo = [
      body.whatsappNo ? `WhatsApp No: ${body.whatsappNo}` : null,
      body.website ? `Website: ${body.website}` : null,
      body.noOfEmployees ? `Employees: ${body.noOfEmployees}` : null,
      body.message ? `Message: ${body.message}` : null,
      body.city ? `City: ${body.city}` : null,
      body.state ? `State: ${body.state}` : null,
    ].filter(Boolean).join(" | ");

    // ✅ FIXED PAYLOAD (Same as previous successful fix)
    const payload: Record<string, any> = {
      // 1. Name
      first_name: body.firstName,
      last_name: body.lastName || "",
      lead_name: `${body.firstName || ""} ${body.lastName || ""}`.trim(),
      
      // 2. Contact
      email_id: body.email,
      mobile_no: body.phone || "",
      
      // ✅ Whatsapp No goes to 'phone' field to avoid Hook Error
      // phone: body.whatsappNo || "",
       whatsapp_no: body.whatsappNo || "",
      
      // 3. Website (Direct Field)
      website: body.website || "",

      // 4. Organization
      company_name: body.company || "",
      industry: body.industry || "",
      no_of_employees: body.noOfEmployees || "",

      // 5. Location
      city: body.city || "",
      state: body.state || "",

      // 6. Source & Status
      source: "Website",
      status: "Lead",
      custom_lead_interest: "SOLTECH Nexus", // Site Specific
      custom_redirect_form: pageSource,

      // 7. Notes (Backup of all info)
      lead_source_details: detailedInfo,

      // 8. Owner
      lead_owner: "lead@soltechnexus.com",
    };

    // Remove empty keys
    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key];
    });


    const response = await fetch(`${ERP_CONFIG.url}/api/resource/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();


    if (!response.ok) {
      const errorMsg = parseErrorMessage(data);
      return NextResponse.json(
        { success: false, error: errorMsg, details: data }, 
        { status: response.status }
      );
    }

 
    return NextResponse.json(
      { 
        success: true, 
        message: "Lead created successfully",
        data: data 
      }, 
      { status: 200 }
    );

  } catch (error: any) {
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

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}