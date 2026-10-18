// Adres produkcyjny: NEXT_PUBLIC_SITE_URL (np. po podpięciu własnej domeny),
// a w przeciwnym razie domena produkcyjna projektu na Vercelu.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
