export const environment = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_CURRENCY: process.env.STRIPE_CURRENCY,
  STRIPE_SUCCESS_URL: process.env.STRIPE_SUCCESS_URL,
  STRIPE_FAILED_URL: process.env.STRIPE_FAILED_URL,
};
