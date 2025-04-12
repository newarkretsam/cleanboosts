import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Fetch store data from the external API
async function fetchStoreData() {
  try {
    const response = await fetch('https://dash.sellhub.cx/api/sellhub/store', {
      method: 'GET',
      headers: {
        "Authorization": process.env.SELLHUB_API_TOKEN
      }
    });

    if (!response.ok) {
      console.warn(`API returned status: ${response.status}. Using fallback data.`);
      
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching store data:", error);
  }
}

export async function GET() {
  try {
    // Fetch the store data, falling back to hardcoded data if needed
    const storeData = await fetchStoreData();
    
    // Extract the TOS from the store data
    const tos = storeData.data.store.tos;
    
    if (!tos) {
      return NextResponse.json({ 
        success: false, 
        error: "Terms of Service not found" 
      }, { status: 404 });
    }
    
    // Return the TOS as JSON with a 200 OK status
    return NextResponse.json({ 
      success: true, 
      tos: tos 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Terms of Service:", error);
    
    // Return an error response
    return NextResponse.json({ 
      success: false, 
      error: "Failed to retrieve Terms of Service" 
    }, { status: 500 });
  }
}