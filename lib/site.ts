// ---------------------------------------------------------------------------
// Central site configuration. Edit contact details here in ONE place.
// ---------------------------------------------------------------------------
export const site = {
  name: "CreditFixs",
  domain: "creditfixs.in",
  url: "https://creditfixs.in",
  email: "info@creditfixs.in",
  // TODO: replace with your real phone / WhatsApp number before going live
  phone: "+91-9000000000",
  phoneDisplay: "+91 90000 00000",
  whatsapp: "919000000000",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  addressCountry: "IN",
  foundingYear: 2024,
  social: {
    // Add real profile URLs when available; empty strings are skipped in JSON-LD
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;

export const BUREAUS = [
  "CIBIL (TransUnion)",
  "Experian",
  "Equifax",
  "CRIF High Mark",
] as const;
