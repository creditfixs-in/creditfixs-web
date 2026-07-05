export interface PageMeta {
  title: string;
  description: string;
}

export interface ServiceCopy {
  title: string;
  short: string;
  description: string;
  points: string[];
}

export interface Dictionary {
  meta: {
    home: PageMeta;
    services: PageMeta;
    about: PageMeta;
    contact: PageMeta;
    faq: PageMeta;
    resources: PageMeta;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    resources: string;
    faq: string;
    contact: string;
    getStarted: string;
    menu: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    gaugeLabel: string;
    stats: { value: string; label: string }[];
  };
  bureaus: {
    title: string;
  };
  problems: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    viewAll: string;
    learnMore: string;
    whatWeDo: string;
    ctaTitle: string;
    ctaSubtitle: string;
    items: Record<string, ServiceCopy>;
  };
  process: {
    title: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  why: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    call: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      issueType: string;
      issueOptions: string[];
      bureau: string;
      bureauAny: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successDesc: string;
      error: string;
      privacyNote: string;
    };
    info: {
      title: string;
      emailLabel: string;
      phoneLabel: string;
      whatsappLabel: string;
      hoursLabel: string;
      hours: string;
      responseNote: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    valuesTitle: string;
    values: { title: string; desc: string }[];
  };
  resources: {
    title: string;
    subtitle: string;
    readMore: string;
    backToResources: string;
    englishNote: string;
    publishedOn: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    ourServices: string;
    legal: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    disclaimerText: string;
    rights: string;
  };
  common: {
    breadcrumbHome: string;
    freeConsultation: string;
  };
}
