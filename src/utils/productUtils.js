/**
 * Maps API product data to standardized format
 */
export const mapSellHubProducts = (response, categoryProductMap = {}) => {
  let productsToMap = [];
  
  // Handle different response formats
  if (response.success && Array.isArray(response.data)) {
    productsToMap = response.data;
  } else if (Array.isArray(response)) {
    productsToMap = response;
  } else if (response.data && Array.isArray(response.data)) {
    productsToMap = response.data;
  } else {
    return [];
  }
  
  return mapProducts(productsToMap, categoryProductMap);
};

/**
 * Transforms product objects to app-specific format
 */
function mapProducts(products, categoryProductMap = {}) {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }
  
  return products.map((product) => {
    // Get category and descriptions from categoryProductMap
    let category = "Other";
    let shortDescription = "";
    let description = "";
    
    if (product.id && categoryProductMap[product.id]) {
      const productInfo = categoryProductMap[product.id];
      category = productInfo.category || "Other";
      shortDescription = productInfo.shortDescription || "";
      description = productInfo.description || "";
    } else if (product.productId && categoryProductMap[product.productId]) {
      const productInfo = categoryProductMap[product.productId];
      category = productInfo.category || "Other";
      shortDescription = productInfo.shortDescription || "";
      description = productInfo.description || "";
    } else {
      category = determineCategory(product.name || "", product.shortDescription || "");
      // Fallback to product shortDescription if not found in categoryProductMap
      shortDescription = product.shortDescription || "";
    }
    
    return mapProduct(product, category, shortDescription, description, product.stock);
  });
}

// Export the mapProducts function
export { mapProducts };

/**
 * Map a product from the API to our expected format
 */
export function mapProduct(product, category, shortDescription, description, stockFromAPI) {
  // Price formatting
  const discountedPrice = parseFloat(product.cheapestSubscription) || 0;
  const originalPrice = parseFloat(product.originalPrice || product.price) > 0 
    ? parseFloat(product.originalPrice || product.price)
    : discountedPrice * 1.5; // Default markup if original price not provided
  
  const formattedDiscountedPrice = discountedPrice.toFixed(2);
  const formattedOriginalPrice = originalPrice.toFixed(2);
  
  const title = product.name || "Product";
  
  // Use the provided descriptions or fallback to product's descriptions
  const productShortDesc = shortDescription || product.shortDescription || "";
  const productDesc = description || product.description || "";
  
  // Extract boost count
  let boosts = 1;
  const boostMatch = title.match(/(\d+)\s*(?:server)?\s*boost/i);
  if (boostMatch) {
    boosts = parseInt(boostMatch[1]);
  } else if (category === "Server Boosts") {
    boosts = Math.max(1, Math.floor(discountedPrice / 10));
  }
  
  // Default features
  let features = ["Instant Delivery", "24/7 Support"];
  
  const stockValue = stockFromAPI !== undefined ? stockFromAPI : product.stock;
  
  if (stockValue === null) {
    features.unshift("Always Available");
  } else if (stockValue > 0) {
    features.push(`${stockValue} Available`);
  } else if (stockValue === 0) {
    features.push("Out of Stock");
  }
  
  if (product.deliveryTime && product.deliveryTime !== "instant") {
    features.push(`${product.deliveryTime.charAt(0).toUpperCase() + product.deliveryTime.slice(1)} Delivery`);
  }
  
  // Determine product image based on name
  const imageUrl = determineProductImage(title);
  
  return {
    id: product.id,
    productId: product.id,
    title: title,
    boosts: boosts,
    originalPrice: originalPrice,
    discountedPrice: discountedPrice,
    formattedOriginalPrice: formattedOriginalPrice,
    formattedDiscountedPrice: formattedDiscountedPrice,
    features: features,
    shortDescription: productShortDesc,
    description: productDesc,
    popular: false,
    category: category,
    stock: stockValue,
    currency: product.currency || "usd",
    minOrderQuantity: product.minOrderQuantity || 1,
    maxOrderQuantity: product.maxOrderQuantity || 99999,
    hidden: product.hidden || false,
    imageUrl: imageUrl,
  };
}

/**
 * Determine product image based on product name including month variants
 */
export function determineProductImage(name) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes("discord account")) {
    const yearMatch = nameLower.match(/\((\d{4})\)/);
    if (yearMatch && yearMatch[1]) {
      return `/image/productCard/2015-2024 Discord Accounts/Discord-Account-${yearMatch[1]}.gif`;
    }
    return "/image/productCard/2015-2024 Discord Accounts/Discord-Account-2024.gif";
  }
  
  if (nameLower.includes("nitro tokens")) {
    const monthMatch = nameLower.match(/(\d+)\s*month/i);
    if (monthMatch && monthMatch[1]) {
      const months = monthMatch[1];
      return `/image/productCard/Nitro-Tokens-${months}mon.gif`;
    }
    return "/image/productCard/Nitro-Tokens-1mon.gif";
  }

  if (nameLower.includes("Discord Nitro Gift Link")) {
    return "/image/productCard/Nitro-Boost-Gift-Link.gif";
  }
  
  // Match Boost Bots with different durations
  if (nameLower.includes("boost tool") || nameLower.includes("boost-tool")) {
    // Check for specific duration types
    if (nameLower.includes("weekly")) {
      return "/image/productCard/Boost-Tool.gif";
    } else if (nameLower.includes("monthly")) {
      return "/image/productCard/Boost-Tool.gif";
    } else if (nameLower.includes("lifetime")) {
      return "/image/productCard/Boost-Tool.gif";
    }
    return "/image/productCard/Boost-Tool.gif";
  }

  if (nameLower.includes("boost bot")) {
    // Check for specific duration types
    if (nameLower.includes("weekly")) {
      return "/image/productCard/Boost-Bot.gif";
    } else if (nameLower.includes("monthly")) {
      return "/image/productCard/Boost-Bot.gif";
    } else if (nameLower.includes("lifetime")) {
      return "/image/productCard/Boost-Bot.gif";
    }
    return "/image/productCard/Boost-Tool.gif";
  }
  
  // Match Server Boosts with month variants
  if (nameLower.includes("server boost") || nameLower.match(/\d+.*boost/i)) {
    // Check for month specification
    const monthMatch = nameLower.match(/(\d+)\s*month/i);
    if (monthMatch && monthMatch[1]) {
      const months = monthMatch[1];
      return `/image/productCard/Server-Boosts-${months}mon.gif`;
    }
    return "/image/productCard/Server-Boosts.gif";
  }
  
  // Match Vanity products with durations
  if (nameLower.includes("vanity")) {
    if (nameLower.includes("day")) {
      return "/image/productCard/Vanity-sniper-day.gif";
    } else if (nameLower.includes("month")) {
      return "/image/productCard/Vanity-sniper-Month.gif";
    }else if (nameLower.includes("week")) {
      return "/image/productCard/Vanity-sniper-Week.gif";
    } else if (nameLower.includes("lifetime")) {
      return "/image/productCard/Vanity-sniper-Lifetime.gif";
    }
    return "/image/productCard/other.gif";
  }
  
  // Match Spotify products with durations
  if (nameLower.includes("spotify")) {
    if (nameLower.includes("yearly")) {
      return "/image/productCard/spotify.gif";
    } else if (nameLower.includes("monthly")) {
      return "/image/productCard/spotify.gif";
    }
    return "/image/productCard/spotify.gif";
  }

  if (nameLower.includes("discord member")) {
    if(nameLower.includes("offline")){
      return "/image/productCard/Offline-Member’s_1.gif";
    }
    else if(nameLower.includes("online")){
      return "/image/productCard/Online-Member’s_1.gif";
    }
  }

  if (nameLower.includes("discord decoration")) {
    
      return "/image/productCard/DC-decor_1.gif";
    
  }

  
  // Match Gift products
  if (nameLower.includes("gift")) {
    return "/image/productCard/Nitro-Boost-Gift-Link.gif";
  }
  
  return "/image/productCard/other.gif";
}


function determineCategory(name, desc) {
  name = (name || "").toLowerCase();
  desc = (desc || "").toLowerCase();
  
  if (name.includes("boost") || desc.includes("boost")) {
    return "Discord Server Boosts";
  } else if (name.includes("nitro tokens") || desc.includes("nitro")) {
    return "Nitro Tokens";
  } else if (name.includes("discord account") || desc.includes("discord account")) {
    return "Discord Accounts";
  } else if (name.includes("spotify") || desc.includes("spotify")) {
    return "Spotify Premium";
  } else if (name.includes("bot") || desc.includes("bot")) {
    return "Discord Bots";
  } else if (name.includes("gift link") || desc.includes("gift link") || 
            (name.includes("gift") && name.includes("nitro")) || 
            (desc.includes("gift") && desc.includes("nitro"))) {
    return "Gift Links";
  } else if (name.includes("promo") || desc.includes("promo")) {
    return "Discord Promos";
  }
  else{
    return "Other";
  }
  
}
