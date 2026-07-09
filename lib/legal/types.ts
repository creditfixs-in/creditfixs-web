export interface LegalSection {
  h: string;
  /** Body paragraphs. May contain {name}, {domain}, {email} placeholders. */
  body: string[];
}

export type LegalDocKey = "privacy" | "terms";

export type LegalContent = Record<LegalDocKey, LegalSection[]>;
