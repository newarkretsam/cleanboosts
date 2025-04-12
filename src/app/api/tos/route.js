import { NextResponse } from "next/server";

const FALLBACK_TOS = `
# Terms of Service

## 1. Introduction
Welcome to CleanBoosts. By accessing our services, you agree to these Terms of Service.

## 2. Service Description
CleanBoosts provides Discord-related services including server boosts, nitro, and other digital products.

## 3. User Responsibilities
Users must comply with Discord's Terms of Service and our guidelines when using our products.

## 4. Refund Policy
All sales are final. We do not offer refunds once services are delivered.
`;

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
      return { 
        data: { 
          store: { 
            tos: FALLBACK_TOS 
          } 
        } 
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { 
      data: { 
        store: { 
          tos: FALLBACK_TOS 
        } 
      } 
    };
  }
}

export async function GET() {
  try {
    const storeData = await fetchStoreData();
    
    if (!storeData || !storeData.data || !storeData.data.store) {
      return NextResponse.json({ 
        success: true, 
        tos: FALLBACK_TOS 
      }, { status: 200 });
    }
    
    const tos = storeData.data.store.tos || FALLBACK_TOS;
    
    return NextResponse.json({ 
      success: true, 
      tos: tos 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Terms of Service:", error);
    
    return NextResponse.json({ 
      success: true, 
      tos: FALLBACK_TOS,
      fromFallback: true
    }, { status: 200 });
  }
}