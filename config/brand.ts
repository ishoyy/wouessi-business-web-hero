export const BRAND = {
  companyName: "Wouessi Inc.",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@wouessi.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  socials: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE || "",
    x: process.env.NEXT_PUBLIC_X || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || ""
  },
  legal: {
    privacyPath: "/privacy",
    confidentialityPath: "/confidentiality",
    termsPath: "/terms"
  },
  footer: {
    traderLine: "BusinessWebHero® is a registered trader of Wouessi Inc."
  },
  payments: {
    stripe: { enabled: true },
    paypal: { enabled: true },
    paybridge: {
      enabled: (process.env.NEXT_PUBLIC_PAYBRIDGE_ENABLED || "").toLowerCase() === "true",
      url: process.env.NEXT_PUBLIC_PAYBRIDGE_CHECKOUT_URL || ""
    }
  }
} as const;
