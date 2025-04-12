import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dash.sellhub.cx/api/sellhub/products/variants", {
      headers: {
        "Authorization": process.env.SELLHUB_API_TOKEN
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract variants from the correct data structure
    const allProducts = data?.data?.variants || [];
    
    // Filter to only include necessary fields and ensure stock values match correctly
    const securedProducts = allProducts.map(product => {
      // Get stock value, ensuring it's handled according to the API response format
      // If stockVisible is false or undefined, stock will be null as shown in the example data
      const stockValue = product.stockVisible ? product.stock : null;
      
      return {
        id: product.id,
        productId: product.productId,
        name: product.name,
        price: product.price,
        priceSlash: product.priceSlash,
        currency: product.currency,
        shortDescription: product.shortDescription,
        deliveryTime: product.deliveryTime,
        stock: stockValue,
        hidden: product.hidden,
        minOrderQuantity: product.minOrderQuantity,
        maxOrderQuantity: product.maxOrderQuantity
      };
    });
    
    return NextResponse.json({
      success: true,
      data: securedProducts
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: "Failed to fetch products" 
    }, { status: 500 });
  }
}