/**
 * Fallback static product data used when API fails
 */
export const staticProducts = [

  {
    id: 2,
    title: "Standard Boost Pack",
    boosts: 8,
    originalPrice: 69.99,
    discountedPrice: 34.99,
    features: [
      "8 Server Boosts",
      "Level 1 Perks",
      "Instant Delivery",
      "24/7 Support",
      "30-Day Warranty"
    ],
    popular: true,
    variants: ["standard-boost-variant"],
    imageUrl: "/image/logo.webp",
    category: "Discord Server Boosts"
  },
  {
    id: 3,
    title: "Premium Boost Pack",
    boosts: 14,
    originalPrice: 99.99,
    discountedPrice: 49.99,
    features: [
      "14 Server Boosts",
      "Level 2 Perks",
      "Instant Delivery",
      "24/7 Support",
      "30-Day Warranty"
    ],
    popular: false,
    imageUrl: "/image/product-3.png",
    category: "Discord Server Boosts"
  },
  {
    id: 4,
    title: "Nitro Basic Monthly",
    boosts: 0,
    originalPrice: 9.99,
    discountedPrice: 4.99,
    features: [
      "Discord Nitro Basic",
      "Custom Emojis",
      "Profile Badge",
      "30-Day Duration",
      "Instant Delivery"
    ],
    popular: false,
    imageUrl: "/image/logo.webp",
    category: "Nitro Tokens"
  },
  {
    id: 5,
    title: "Gift Card Bundle",
    boosts: 0,
    originalPrice: 49.99,
    discountedPrice: 29.99,
    features: [
      "3 Discord Gift Links",
      "Redeemable Codes",
      "Shareable Links",
      "90-Day Warranty",
      "Bulk Discount"
    ],
    popular: false,
    imageUrl: "/image/logo.webp",
    category: "Gift Links"
  },
  {
    id: 6,
    title: "Discord Server Setup",
    boosts: 0,
    originalPrice: 99.99,
    discountedPrice: 59.99,
    features: [
      "Custom Server Setup",
      "Role Configuration",
      "Channel Structure",
      "Bot Integration",
      "1-hour Consultation"
    ],
    popular: false,
    imageUrl: "/image/logo.webp",
    category: "Personalized Help"
  }
];

export const productCategories = [
  "All Products",
  "Discord Server Boosts",
  "Nitro Tokens",
  "Gift Links",
  "Discord Promos",
  "Personalized Help",
  "Other"
];
