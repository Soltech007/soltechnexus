import { NextRequest, NextResponse } from "next/server";

// ✅ Sales Partner ERP Config
// const ERP_CONFIG = {
//   url: "http://45.149.206.178",
//   apiKey: "16e7e2c516604d2",
//   apiSecret: "e21970e5493a485",
// } as const;

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
  let errorMessage = "Failed to create sales partner";
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

// ✅ Function to ensure Territory exists
async function ensureTerritoryExists(territoryName: string): Promise<boolean> {
  try {
    const checkResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Territory/${encodeURIComponent(territoryName)}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
      }
    );

    if (checkResponse.ok) {
      console.log(`✅ Territory "${territoryName}" exists`);
      return true;
    }

    console.log(`📝 Creating Territory: ${territoryName}`);
    const createResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Territory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
        body: JSON.stringify({
          territory_name: territoryName,
          is_group: 0,
        }),
      }
    );

    return createResponse.ok;
  } catch (error) {
    console.error("Error with Territory:", error);
    return false;
  }
}

// ✅ Function to ensure Sales Partner Type exists
async function ensureSalesPartnerTypeExists(typeName: string): Promise<boolean> {
  try {
    const checkResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Sales Partner Type/${encodeURIComponent(typeName)}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
      }
    );

    if (checkResponse.ok) {
      console.log(`✅ Sales Partner Type "${typeName}" exists`);
      return true;
    }

    console.log(`📝 Creating Sales Partner Type: ${typeName}`);
    const createResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Sales Partner Type`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
        body: JSON.stringify({
          sales_partner_type: typeName,
        }),
      }
    );

    return createResponse.ok;
  } catch (error) {
    console.error("Error with Sales Partner Type:", error);
    return false;
  }
}

// ✅ Function to ensure Industry exists (Link field)
async function ensureIndustryExists(industryName: string): Promise<boolean> {
  if (!industryName) return true;
  
  try {
    const checkResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Industry Type/${encodeURIComponent(industryName)}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
      }
    );

    if (checkResponse.ok) {
      console.log(`✅ Industry "${industryName}" exists`);
      return true;
    }

    console.log(`📝 Creating Industry: ${industryName}`);
    const createResponse = await fetch(
      `${ERP_CONFIG.url}/api/resource/Industry Type`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
        },
        body: JSON.stringify({
          industry: industryName,
        }),
      }
    );

    return createResponse.ok;
  } catch (error) {
    console.error("Error with Industry:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("📥 Sales Partner Application Data:", JSON.stringify(body, null, 2));

    // Basic Validation
    if (!body.firstName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, Email and Phone are required" },
        { status: 400 }
      );
    }

    // ✅ Ensure required linked values exist
    const partnerTypeName = "Referral Partner";
    const territoryName = "India";
    
    await ensureSalesPartnerTypeExists(partnerTypeName);
    await ensureTerritoryExists(territoryName);
    
    // If industry provided, ensure it exists
    if (body.industry) {
      await ensureIndustryExists(body.industry);
    }

    // Full partner name
    const partnerName = `${body.firstName} ${body.lastName || ""}`.trim();

    // ✅ Complete Sales Partner Payload with ALL Custom Fields
    const payload: Record<string, any> = {
      // ===== Standard Fields =====
      partner_name: partnerName,
      partner_type: partnerTypeName,
      territory: territoryName,
      commission_rate: 0,
      
      // ===== Custom Fields (as per your ERP) =====
      
      // GSTIN
      custom_gstin: body.gstNumber || "",
      
      // Organization Name
      custom_organization_name: body.company || "",
      
      // Industry (Link field - make sure value exists in Industry Type)
      custom_industry: body.industry || "",
      
      // State
      custom_state: body.state || "",

      custom_lead_interest: "SOLTECH Nexus",
      custom_source:"Website",
      custom_redirect_form:"Reffrel Partner Application",
      
      // City
      custom_city: body.city || "",
      
      // Phone
      custom_phone: body.phone || "",
      
      // Email
      custom_email: body.email || "",
      
      // Website (if you have this field)
      custom_website: body.website || "",
      
      // No of Employees (if you have this field)
      custom_no_of_employees: body.noOfEmployees || "",
      
      // Source
    //   custom_source: body.source || "Website - Sales Partner Application",
    };

    // Remove empty custom fields to avoid errors
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "" || payload[key] === null || payload[key] === undefined) {
        // Keep required fields, remove empty optional ones
        if (!["partner_name", "partner_type", "territory", "commission_rate"].includes(key)) {
          delete payload[key];
        }
      }
    });

    console.log("📤 Sending to Sales Partner ERP:", JSON.stringify(payload, null, 2));

    // API Call
    const response = await fetch(`${ERP_CONFIG.url}/api/resource/Sales Partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${ERP_CONFIG.apiKey}:${ERP_CONFIG.apiSecret}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("📨 ERP Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      const errorMsg = parseErrorMessage(data);
      console.error("❌ ERP Error:", errorMsg);

      // Ignore automation errors
      const ignoredErrors = [
        "Connection refused",   
        "Outgoing Mail Server", 
        "WhatsApp", 
        "Message Triggered", 
        "Triggered",
        "Email Queue"
      ];
      const isIgnorableError = ignoredErrors.some(err => errorMsg.includes(err));

      if (isIgnorableError) {
        return NextResponse.json(
          { success: true, message: "Application submitted successfully!" },
          { status: 200 }
        );
      }

      // Handle duplicate
      if (response.status === 409 || errorMsg.includes("Duplicate")) {
        return NextResponse.json(
          { success: true, message: "Application already exists" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: errorMsg, details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Sales Partner application submitted successfully!", 
        partnerId: data.data?.name 
      },
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