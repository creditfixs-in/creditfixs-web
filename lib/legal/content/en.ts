import type { LegalContent } from "../types";

/** English legal copy (also the fallback for any locale missing a translation). */
export const en: LegalContent = {
  privacy: [
    {
      h: "Information we collect",
      body: [
        "When you submit our contact form, we collect the details you provide: your name, email address, phone number, the type of credit issue you describe, the credit bureau involved, and your message. We also store the language you used on the site so we can respond in the same language.",
      ],
    },
    {
      h: "How we use your information",
      body: [
        "Your details are used solely to respond to your enquiry, provide a consultation, and — if you engage our services — to deliver those services. We do not sell, rent or share your personal information with third parties for marketing.",
        "We may retain enquiry records for internal follow-up and legal compliance. You may request deletion of your data at any time by emailing us.",
      ],
    },
    {
      h: "Sensitive financial information",
      body: [
        "If you later share credit reports or loan documents with us as part of a consultation, they are used only to analyse and pursue your case, are shared only with the bureaus/lenders involved in your disputes, and are deleted on request when the engagement ends.",
      ],
    },
    {
      h: "Data storage and security",
      body: [
        "Contact submissions are stored securely in our database (hosted on Supabase) over encrypted connections. Access is restricted to authorised team members.",
      ],
    },
    {
      h: "Cookies and analytics",
      body: [
        "This website does not use advertising cookies. If analytics are enabled in future, they will be privacy-respecting and this policy will be updated.",
      ],
    },
    {
      h: "Your rights",
      body: [
        "You may request a copy, correction or deletion of your personal data at any time. Contact us at the email below and we will respond within 30 days.",
      ],
    },
    {
      h: "Contact",
      body: ["For any privacy questions or requests, email us at {email}."],
    },
  ],
  terms: [
    {
      h: "Who we are",
      body: [
        "{name} is an independent credit consultation service operating in India. We are not a bank, NBFC, credit bureau, or lender, and we are not affiliated with TransUnion CIBIL, Experian, Equifax, CRIF High Mark or the Reserve Bank of India.",
      ],
    },
    {
      h: "Nature of our services",
      body: [
        "We provide analysis of credit reports, guidance on and assistance with raising disputes for inaccurate, outdated or unverifiable information, loan-readiness consultation, monitoring and credit education.",
        "We work strictly within the legal dispute framework available to every borrower in India. We do not and cannot remove genuine, accurate records from a credit report, and we never create or submit false documents.",
      ],
    },
    {
      h: "No guaranteed outcomes",
      body: [
        "Dispute outcomes depend on bureaus, lenders and the facts of each case. Any timelines we mention (for example, typical 30–90 day dispute cycles) are indicative, not promises. We do not guarantee a specific score increase or loan approval.",
      ],
    },
    {
      h: "Fees",
      body: [
        "The first consultation is free. Any subsequent fees are quoted in writing before work begins. Fees paid are for professional effort (analysis, documentation, filing, follow-up) and are not contingent on a specific outcome unless expressly agreed in writing.",
      ],
    },
    {
      h: "Your responsibilities",
      body: [
        "You agree to provide accurate information and genuine documents. We may refuse or terminate service if asked to pursue false disputes or submit fabricated evidence.",
      ],
    },
    {
      h: "Limitation of liability",
      body: [
        "To the maximum extent permitted by law, our liability for any claim arising out of our services is limited to the fees you paid us for those services.",
      ],
    },
    {
      h: "Contact",
      body: ["Questions about these terms: {email}."],
    },
  ],
};
