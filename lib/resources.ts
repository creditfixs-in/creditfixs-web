export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO date
  readMinutes: number;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "how-to-fix-cibil-score",
    title: "How to Fix Your CIBIL Score: A Step-by-Step Guide for India",
    description:
      "A practical, step-by-step guide to repairing a low CIBIL score — from getting your report and spotting errors to raising disputes and rebuilding credit habits.",
    datePublished: "2026-05-10",
    readMinutes: 7,
    sections: [
      {
        paragraphs: [
          "A low CIBIL score is rarely a mystery. It is almost always caused by specific, identifiable entries in your credit report — late payments, high card utilisation, too many enquiries, or plain reporting errors. Fixing the score means finding those entries and dealing with each one correctly.",
        ],
      },
      {
        heading: "Step 1: Get your reports — all four of them",
        paragraphs: [
          "Most people only check CIBIL, but Indian lenders also use Experian, Equifax and CRIF High Mark. Each bureau is entitled to give you one free report per year. Download all four, because an error can exist in one bureau and not the others — and you never know which bureau your next lender will check.",
        ],
      },
      {
        heading: "Step 2: Audit the report line by line",
        list: [
          "Personal details: wrong PAN, name spelling or date of birth can mix your file with someone else's.",
          "Accounts: every loan and card listed — do you recognise all of them? Watch for loan-app entries (CashBean/PC Financial, Sunidhi Capital, etc.).",
          "Status fields: 'Settled', 'Written-off', 'Suit Filed' and DPD (days past due) values do the most damage.",
          "Enquiries: hard enquiries you did not authorise may indicate misuse of your PAN.",
        ],
      },
      {
        heading: "Step 3: Dispute what is wrong",
        paragraphs: [
          "Each bureau has an online dispute form. Attach evidence: NOCs, closure letters, bank statements, payment receipts. Raise the issue with the lender in parallel — bureaus can only report what lenders confirm. Bureaus typically must resolve disputes within 30 days; complex lender-side corrections can take 60–90 days.",
        ],
      },
      {
        heading: "Step 4: Fix what is genuinely yours",
        list: [
          "Bring credit card utilisation under 30% of the limit (under 10% is ideal).",
          "Set up auto-pay so no EMI or card bill is ever late again.",
          "Stop applying for new credit for 6 months — every application is a hard enquiry.",
          "If an account is 'Settled', consider paying the remaining amount and requesting a 'Closed' status with an NOC.",
        ],
      },
      {
        heading: "How long does it take?",
        paragraphs: [
          "Error corrections reflect within one or two reporting cycles after resolution. Behavioural improvements (utilisation, on-time payments) typically show meaningful score movement in 3–6 months. Anyone promising an overnight jump is not being honest with you.",
        ],
      },
    ],
  },
  {
    slug: "pc-financial-cashbean-entry-on-credit-report",
    title: "PC Financial (CashBean) Entry on Your Credit Report? Here's What to Do",
    description:
      "Thousands of Indians still see PC Financial / CashBean loan entries on CIBIL and other bureaus — often wrong, repaid or never taken. Here's how to dispute them.",
    datePublished: "2026-05-24",
    readMinutes: 6,
    sections: [
      {
        paragraphs: [
          "PC Financial Services Pvt Ltd operated the CashBean instant-loan app. The RBI cancelled its NBFC licence, but entries reported by it continue to appear on credit reports years later — repaid loans still shown as overdue, wrong outstanding amounts, or loans the person never took at all.",
          "Because the lender is no longer operating normally, borrowers often feel stuck: there is no active customer care to fix the record. The entry, however, is still disputable.",
        ],
      },
      {
        heading: "Why these entries hurt so much",
        paragraphs: [
          "An 'overdue' or 'written-off' status — even for a tiny ₹2,000 app loan — reads as an active default to any bank underwriter. We have seen home loan applications rejected over loan-app entries smaller than the applicant's monthly phone bill.",
        ],
      },
      {
        heading: "Your dispute path",
        list: [
          "Collect every proof you have: repayment screenshots, bank/UPI statements, SMS records, emails.",
          "Raise an online dispute with each bureau showing the entry (CIBIL, Experian, Equifax, CRIF High Mark) — dispute category: incorrect account status / balance, or 'account not mine'.",
          "If the loan was never taken, treat it as identity misuse: file a cyber-crime complaint (cybercrime.gov.in) and attach the acknowledgement to your dispute.",
          "If the bureau replies 'data confirmed by lender' on a clearly wrong entry, escalate: complaint to the bureau's grievance officer, then the RBI CMS portal.",
        ],
      },
      {
        heading: "What usually happens",
        paragraphs: [
          "Disputes on defunct-lender entries take persistence — often more than one cycle — but bureaus are obliged to delete information that can no longer be verified by the lender. With documentation and correct escalation, most genuine cases get corrected. This is one of the most common cases we handle at CreditFixs; if you are stuck after a rejected dispute, get in touch for a free review.",
        ],
      },
    ],
  },
  {
    slug: "sunidhi-capital-loan-entry-dispute",
    title: "Sunidhi Capital Loan Entry Hurting Your CIBIL? How to Dispute It",
    description:
      "Seeing a Sunidhi Capital (loan-app) entry you don't recognise or already repaid? Step-by-step dispute process for app-lender NBFC entries in India.",
    datePublished: "2026-06-02",
    readMinutes: 5,
    sections: [
      {
        paragraphs: [
          "Sunidhi Capital is one of several NBFC names that appear on credit reports as the lender-of-record behind instant loan apps. Many borrowers never knew the NBFC's name — they only knew the app — so the entry looks unfamiliar and alarming when it shows up on CIBIL or Experian.",
        ],
      },
      {
        heading: "First: identify what the entry actually is",
        paragraphs: [
          "Match the loan date and amount with your bank statement and old loan apps. Three possibilities: (1) it is a genuine app loan you repaid — then the problem is wrong status/balance; (2) it is genuine and unpaid — then it needs settlement/closure, not deletion; (3) you never took it — identity misuse.",
        ],
      },
      {
        heading: "Dispute checklist",
        list: [
          "Repaid: gather repayment proof and dispute the status/balance with each bureau; ask the lender's grievance email for an NOC.",
          "Never taken: police/cyber-crime complaint first, then bureau dispute with 'account not mine' + complaint copy.",
          "Wrong amount/DPD: dispute the specific field with your statement as proof.",
          "Always dispute at every bureau showing the entry — corrections at one bureau do not sync to the others.",
        ],
      },
      {
        heading: "If the dispute gets rejected",
        paragraphs: [
          "A rejected dispute is not the end. Escalate to the lender's nodal/grievance officer in writing, then to the RBI Complaint Management System (cms.rbi.org.in) against the lender. Bureaus must delete entries the lender cannot verify. Keep every reference number — the paper trail is what wins these cases.",
        ],
      },
    ],
  },
  {
    slug: "home-loan-rejected-low-cibil",
    title: "Home Loan Rejected Due to Low CIBIL? Your Recovery Roadmap",
    description:
      "Why banks reject home loans on credit grounds, what the rejection actually means, and a realistic 3–6 month roadmap to approval.",
    datePublished: "2026-06-12",
    readMinutes: 7,
    sections: [
      {
        paragraphs: [
          "A home loan is the most credit-sensitive product in Indian banking. Most banks want 700–750+; anything below triggers either rejection or a higher interest rate. But 'low CIBIL' is a symptom — the fix depends entirely on what is dragging the score down.",
        ],
      },
      {
        heading: "Decode the real reason",
        list: [
          "Active overdue or written-off account — the most common hard blocker, even for tiny amounts.",
          "'Settled' status on an old loan — banks read it as partial default.",
          "High credit card utilisation — consistently above 50–60% of your limit.",
          "Too many recent enquiries — applying to 5 banks in a month makes it worse.",
          "Errors: loan-app entries, someone else's account, wrong DPD history.",
        ],
      },
      {
        heading: "The 3–6 month roadmap",
        list: [
          "Month 1: pull all four bureau reports; dispute every incorrect entry with evidence; stop all new credit applications.",
          "Months 1–2: clear genuine small overdues; get NOCs; convert 'Settled' to 'Closed' where you can pay the remainder.",
          "Months 2–4: keep utilisation under 30%, all payments on time; let disputes complete their cycles.",
          "Months 4–6: re-check all four reports, confirm corrections, then apply to ONE lender whose credit policy fits your profile.",
        ],
      },
      {
        heading: "Do not do this",
        paragraphs: [
          "Do not apply to multiple banks 'to try your luck' — each application adds a hard enquiry and lowers the score further. Do not pay agents who promise 'guaranteed deletion' of genuine defaults; that is not legally possible, and fake documents can make you liable. Fix the report first, then apply once, properly.",
        ],
      },
    ],
  },
  {
    slug: "cibil-vs-experian-vs-equifax-vs-crif",
    title: "CIBIL vs Experian vs Equifax vs CRIF High Mark: What's the Difference?",
    description:
      "India has four RBI-licensed credit bureaus, and your score differs at each. What each bureau is, why scores differ, and why you must check all four.",
    datePublished: "2026-06-18",
    readMinutes: 5,
    sections: [
      {
        paragraphs: [
          "India has four RBI-licensed credit information companies: TransUnion CIBIL, Experian, Equifax and CRIF High Mark. Every regulated lender must report your loan data to all four — but in practice, reporting gaps and timing differences mean your file is rarely identical across them.",
        ],
      },
      {
        heading: "Why your scores differ",
        list: [
          "Timing: lenders upload data on different dates to different bureaus.",
          "Coverage: some NBFCs and fintechs historically reported to only one or two bureaus.",
          "Models: each bureau has its own scoring model — the same file scores differently.",
          "Errors: a wrong entry may exist at one bureau and not the others.",
        ],
      },
      {
        heading: "Which score do lenders actually check?",
        paragraphs: [
          "It varies. Large private banks often pull CIBIL; NBFCs and fintech lenders frequently use Experian or CRIF High Mark; many lenders pull two. This is exactly why 'my CIBIL is fine' is not enough — your next lender might check the one bureau where a wrong entry lives.",
        ],
      },
      {
        heading: "The practical takeaway",
        paragraphs: [
          "Check all four reports at least once a year (each bureau gives one free report annually), and when you dispute an error, dispute it at every bureau that shows it. Corrections do not propagate automatically between bureaus.",
        ],
      },
    ],
  },
  {
    slug: "settled-vs-closed-loan-status",
    title: "'Settled' vs 'Closed' Loan Status: Why It Matters for Your Score",
    description:
      "The difference between Settled and Closed on your credit report, how much damage a Settled flag does, and how to convert it to Closed.",
    datePublished: "2026-06-25",
    readMinutes: 4,
    sections: [
      {
        paragraphs: [
          "Two words on your credit report can mean the difference between a home loan approval and a rejection. 'Closed' means the account was repaid in full. 'Settled' means the lender accepted less than the full dues and wrote off the difference — and it stays visible for years.",
        ],
      },
      {
        heading: "How lenders read 'Settled'",
        paragraphs: [
          "To an underwriter, Settled says: this borrower did not repay in full once before. Many banks treat any settled account in the last 3–5 years as grounds for rejection regardless of the current score number. The flag matters more than the score.",
        ],
      },
      {
        heading: "Converting Settled to Closed",
        list: [
          "If the settlement was wrongly reported (you actually paid in full): dispute with payment proof and the lender's own closure letter.",
          "If you genuinely settled: you can offer to pay the waived amount now in exchange for a 'Closed' status update and NOC — many lenders accept this.",
          "After the lender updates its records, verify the status change at all four bureaus in the next reporting cycle.",
        ],
      },
      {
        heading: "One warning",
        paragraphs: [
          "When lenders or agents offer a quick 'settlement' on an old dispute, understand what you are agreeing to: settlement closes the recovery, but marks your report. If you can pay in full — even a little later — a Closed status is worth far more than the discount.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
