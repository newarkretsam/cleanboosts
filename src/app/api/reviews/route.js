import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://myvouch.es/api/vouches/cleanboosts");

    if (!response.ok) {
      // Log the actual response content to debug
      const textResponse = await response.text();
      console.error("API Error Response:", textResponse.substring(0, 200)); // Show first 200 chars
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Check content type to make sure it's JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Unexpected content type:", contentType);
      console.error("Response start:", textResponse.substring(0, 200));
      throw new Error("API didn't return JSON");
    }

    const data = await response.json();
    
    const filteredData = data.filter(vouch => vouch.proof !== null);

    const randomItems = filteredData
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, filteredData.length));

    return NextResponse.json({
      success: true,
      data: randomItems
    });
  } catch (error) {
    console.error("Error fetching MyVouches data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vouches"
      },
      { status: 500 }
    );
  }
}