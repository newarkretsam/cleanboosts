import { NextResponse } from "next/server";

const FALLBACK_TOS = "# Default Terms of Service\n\nThese are the default terms of service for CleanBoosts.";

export async function GET() {
  try {
    // Fetch the store data
    const response = await fetch("https://dash.sellhub.cx/api/sellhub/store", {
      headers: {
        "Authorization": process.env.SELLHUB_API_TOKEN
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.data?.store) {
      return NextResponse.json({ 
        success: true, 
        tos: FALLBACK_TOS 
      }, { status: 200 });
    }
    
    const tos = data.data.store.tos || FALLBACK_TOS;
    
    // Return the TOS as JSON with a 200 OK status
    return NextResponse.json({ 
      success: true, 
      tos: tos 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Terms of Service:", error);
    
    // Return fallback TOS instead of error
    return NextResponse.json({ 
      success: true, 
      tos: FALLBACK_TOS,
      fromFallback: true
    }, { status: 200 });
  }
}