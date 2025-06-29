// Environment configuration for Vite
export const env = {
  // Meta API Configuration
  META_API_TOKEN: import.meta.env.VITE_META_API_TOKEN || "",

  // Telegram Configuration
  TELEGRAM_API_TOKEN: import.meta.env.VITE_TELEGRAM_API_TOKEN || "",
  TELEGRAM_BOT_USERNAME: "@AutomatedTraderBot",

  // Application URLs
  APP_URL: import.meta.env.VITE_APP_URL || "",
  LANDING_URL: import.meta.env.VITE_LANDING_URL || "/",

  // Sellix Configuration
  SELLIX_WEBHOOK_SECRET: import.meta.env.VITE_SELLIX_WEBHOOK_SECRET || "",

  // Analytics & Marketing
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
  KLAVIO_PRIVATE_KEY: import.meta.env.VITE_KLAVIO_PRIVATE_KEY || "",

  // API Endpoints
  WEBHOOK_RECEIVER_URL:
    import.meta.env.VITE_WEBHOOK_RECEIVER_URL || "http://localhost:4000",
  TRADE_MANAGEMENT_URL:
    import.meta.env.VITE_TRADE_MANAGEMENT_URL || "http://localhost:4001",

  //
  VITE_TELEGRAM_API_TOKEN: import.meta.env.VITE_TELEGRAM_API_TOKEN,
  // Feature Flags
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  MODE: import.meta.env.MODE,

  //Backend URL

  BASE_URL: import.meta.env.VITE_BASE_URL || "http://16.171.148.93:5000/api",
  AVATAR_URL: import.meta.env.VITE_IMAGE_URL || "http://16.171.148.93:5000/api",

  //
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || "MEET_ASTRO_SECRET",

  //User Sidemunu
  TELEGRAM_COMMUNITY: import.meta.env.VITE_TELEGRAM_COMMUNITY,
  TELEGRAM_SUPPORT: import.meta.env.VITE_TELEGRAM_SUPPORT,
  DISCORD_COMMUNITY: import.meta.env.VITE_DISCORD_COMMUNITY,
  INSTAGRAM_COMMUNITY: import.meta.env.VITE_INSTAGRAM_COMMUNITY,
  PHONE_NUMBER: import.meta.env.VITE_PHONE_NUMBER,
  ADMIN_EMAIL: import.meta.env.VITE_ADMIN_EMAIL,

  SELLIX_API_KEY: import.meta.env.VITE_SELLIX_API_KEY,
  SELLIX_MERCHANT_ID: import.meta.env.VITE_SELLIX_MERCHANT_ID,

  // AWS S3 Configuration
  S3_BUCKET_NAME: import.meta.env.VITE_S3_BUCKET_NAME || "urfx.io",
  AWS_REGION: import.meta.env.VITE_AWS_REGION || "us-east-2",
};
