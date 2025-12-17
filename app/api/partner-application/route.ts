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
  let errorMessage = "Failed to create lead";
  if (data._server_messages) {
    try {
      const messages = JSON.parse(data._server_messages);
      const parsed = JSON.parse(messages[0]);
      errorMessage = stripHtml(parsed.message || errorMessage);
    } catch (e) {
      console.error(e);
    }
  } else if (data.exception) {
    errorMessage = stripHtml(data.exception);
  } else if (data.message) {
    errorMessage = stripHtml(data.message);
  }
  return errorMessage;
}

// ✅ GST Validation Function
function validateGSTNumber(gst: string): { valid: boolean; message: string } {
  if (!gst || gst.trim() === "") {
    return { valid: true, message: "" };
  }

  const gstNumber = gst.trim().toUpperCase();

  if (gstNumber.length !== 15) {
    return { 
      valid: false, 
      message: `GST Number must be exactly 15 characters. You entered ${gstNumber.length} characters.` 
    };
  }

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  
  if (!gstRegex.test(gstNumber)) {
    return { 
      valid: false, 
      message: "Invalid GST Number format. Please enter a valid 15-digit GST Number (e.g., 22AAAAA0000A1Z5)" 
    };
  }

  const stateCode = parseInt(gstNumber.substring(0, 2), 10);
  if (stateCode < 1 || stateCode > 37) {
    return { 
      valid: false, 
      message: "Invalid State Code in GST Number. State code should be between 01 and 37." 
    };
  }

  return { valid: true, message: "" };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📥 Partner Application Data:", JSON.stringify(body, null, 2));

    // Basic Validation
    if (!body.firstName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, Email and Phone are required" },
        { status: 400 }
      );
    }

    // GST Number Validation
    if (body.gstNumber) {
      const gstValidation = validateGSTNumber(body.gstNumber);
      if (!gstValidation.valid) {
        return NextResponse.json(
          { error: gstValidation.message },
          { status: 400 }
        );
      }
    }

    // Build detailed info string for notes
    const detailedInfo = [
      `Partner Category: ${body.partnerCategory || "Channel Partner"}`,
      body.whatsappNo ? `WhatsApp: ${body.whatsappNo}` : null,
      body.website ? `Website: ${body.website}` : null,
      body.noOfEmployees ? `Employees: ${body.noOfEmployees}` : null,
      body.gstNumber ? `GST: ${body.gstNumber.toUpperCase()}` : null,
      body.industry ? `Industry: ${body.industry}` : null,
      body.city ? `City: ${body.city}` : null,
      body.state ? `State: ${body.state}` : null,
    ].filter(Boolean).join(" | ");

    // ✅ ERP Payload - REMOVED problematic fields
    const payload: Record<string, any> = {
      // Name
      first_name: body.firstName,
      last_name: body.lastName || "",
      lead_name: `${body.firstName} ${body.lastName || ""}`.trim(),

      // Contact
      email_id: body.email,
      mobile_no: body.phone || "",
      phone: body.whatsappNo || "", 

      // Company
      company_name: body.company || "",
      website: body.website || "",
      
      // ❌ REMOVED: industry - causing error (not matching ERP values)
      // If you want to include industry, first check valid values at:
      // https://erp.soltechtechservices.com/app/industry-type
      
      no_of_employees: body.noOfEmployees || "",

      // Location
      city: body.city || "",
      state: body.state || "",

      // GST Number
      custom_gstin: body.gstNumber ? body.gstNumber.toUpperCase() : "",

      // Source & Status
      source: "Website",
      status: "Lead",
      custom_lead_interest: "AIBIZHACKS",
      custom_redirect_form: body.source || "Channel Partner Application Form",

      // Notes - Store ALL info here including industry
      lead_source_details: detailedInfo,

      // ❌ REMOVED: lead_owner - causing error (user doesn't exist)
      // lead_owner: "lead@Bizaihacks.com",
    };

    // Remove empty keys
    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key];
    });

    console.log("📤 Sending to ERP:", JSON.stringify(payload, null, 2));

    const response = await fetch(`${ERP_CONFIG.url}/api/resource/Lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = parseErrorMessage(data);
      console.error("❌ ERP Error:", errorMsg);

      // Ignore automation errors
      const ignoredErrors = ["Connection refused", "Outgoing Mail Server", "WhatsApp", "Message Triggered", "Triggered"];
      const isIgnorableError = ignoredErrors.some(err => errorMsg.includes(err));

      if (isIgnorableError) {
        console.log("⚠️ Ignoring Automation Error - Lead assumed created.");
        return NextResponse.json(
          { success: true, message: "Application submitted (Automation pending)" },
          { status: 200 }
        );
      }

      if (response.status === 409) {
        return NextResponse.json(
          { success: true, message: "Application already exists (Duplicate)" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: errorMsg, details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "Partner application submitted successfully", leadId: data.data?.name },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Server Error", message: error.message },
      { status: 500 }
    );
  }
}