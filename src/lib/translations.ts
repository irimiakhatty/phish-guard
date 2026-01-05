export type Language = 'ro' | 'en';

export const translations = {
  ro: {
    // Landing Page
    landing: {
      heroTitle: "Protejează-te de phishing și înșelăciuni online",
      heroSubtitle: "PhishGuard folosește inteligență artificială pentru a detecta și bloca amenințări înainte să fie prea târziu",
      getStartedFree: "Începe gratuit",
      signIn: "Autentificare",
      watchDemo: "Vezi demo",
      trustedBy: "Au încredere în PhishGuard",
      activeUsers: "peste 10,000 utilizatori activi",

      // Features
      howItWorks: "Cum funcționează",
      howItWorksSubtitle: "Protecție completă în trei pași simpli",

      featureRealTime: "Protecție în timp real",
      featureRealTimeDesc: "Monitorizăm continuu emailurile, link-urile și website-urile pentru a te proteja instant",

      featureAI: "Analiză AI avansată",
      featureAIDesc: "Algoritmii noștri de machine learning detectează amenințări noi și sofisticate",

      featureBlock: "Blocare automată",
      featureBlockDesc: "Când detectăm o amenințare, o blocăm automat înainte să interacționezi cu ea",

      // Stats
      statsTitle: "Protecție dovedită",
      statsThreats: "Amenințări blocate lunar",
      statsAccuracy: "Acuratețe de detecție",
      statsResponse: "Timp de răspuns",
      statsUsers: "Utilizatori protejați",

      // Use Cases
      useCasesTitle: "Pentru cine este PhishGuard?",

      individuals: "Persoane fizice",
      individualsDesc: "Protejează-ți datele personale și financiare de phishing și înșelăciuni online",

      businesses: "Companii",
      businessesDesc: "Securizează echipa și datele companiei cu protecție centralizată și raportare avansată",

      families: "Familii",
      familiesDesc: "Asigură siguranța online a întregii familii cu un singur abonament",

      // Testimonials
      testimonialsTitle: "Ce spun utilizatorii noștri",

      testimonial1: "PhishGuard m-a salvat de mai multe tentative de phishing. Simt că pot naviga în siguranță!",
      testimonial1Author: "Ana Popescu",
      testimonial1Role: "Antreprenor",

      testimonial2: "Ca manager IT, PhishGuard ne-a redus incidentele de securitate cu 95%. Investiție excelentă!",
      testimonial2Author: "Mihai Ionescu",
      testimonial2Role: "IT Manager",

      testimonial3: "Interfața este simplă și intuitivă. Îmi place că primesc alerte instant când e ceva suspect.",
      testimonial3Author: "Elena Radu",
      testimonial3Role: "Freelancer",

      // CTA
      ctaTitle: "Începe să te protejezi astăzi",
      ctaSubtitle: "7 zile de Premium gratuit, fără card necesar",
      ctaButton: "Începe trial gratuit",
      ctaSecondary: "Contactează vânzările",
      trialShortText: "7 zile Premium gratuit",
    },

    // Header
    header: {
      tagline: "Protecție anti-phishing AI",
      dashboard: "Dashboard",
      analyze: "Analizează manual",
      pricing: "Abonamente",
      myAccount: "Contul meu",
      settings: "Setări",
      browserExtension: "Extensie browser",
      support: "Suport",
      logout: "Deconectare",
      freePlan: "Plan Gratuit",
      premiumPlan: "Plan Premium",
    },

    // Dashboard
    dashboard: {
      extensionInstalled: "Extensie browser instalată",
      extensionMonitoring: "PhishGuard monitorizează acum navigarea ta în timp real. Vezi demo de alertă mai jos.",
      understood: "Am înțeles",
      threatsBlocked: "Amenințări blocate",
      emailsScanned: "Emailuri scanate",
      detectionRate: "Rată de detecție",
      timeSaved: "Timp salvat",
      vsLastWeek: "vs săptămâna trecută",
      inLast30Days: "În ultimele 30 de zile",
      thisMonth: "În această lună",
      recentActivity: "Activitate recentă",
      realTimeProtection: "Protecție în timp real activă",
      all: "Toate",
      emails: "Emailuri",
      links: "Link-uri",
      websites: "Website-uri",
      blocked: "Blocat",
      highRisk: "Risc ridicat",
      mediumRisk: "Risc mediu",
      nowTime: "Acum",
      minAgo: "min",
      hourAgo: "oră",
      hoursAgo: "ore",
      filteringEmails: "Filtrare emailuri...",
      filteringLinks: "Filtrare link-uri...",
      filteringWebsites: "Filtrare website-uri...",
    },

    // Browser Extension Popup
    extension: {
      threatDetected: "Amenințare detectată",
      suspiciousLinkBlocked: "Link suspect blocat",
      phishGuardBlocked: "PhishGuard a detectat și blocat un link potențial periculos pe această pagină.",
      blockedUrl: "URL blocat:",
      reason: "Motiv:",
      suspiciousDomain: "Domeniu suspect care mimează PayPal",
      unknownSSL: "Certificat SSL necunoscut",
      inPhishingDatabase: "Detectat în baza de date phishing",
      viewFullReport: "Vizualizează raport complet",
      reportFalsePositive: "Raportează fals pozitiv",
      threatsBlockedToday: "Amenințări blocate astăzi:",
    },

    // Manual Analysis
    manualAnalysis: {
      title: "Analizează conținut suspect",
      description: "Trimite link-uri, mesaje sau screenshot-uri pentru analiză manuală",
      freeTrialActive: "Free Trial activ",
      enterContent: "Introdu conținut",
      text: "Text",
      url: "URL",
      image: "Image",
      pasteMessage: "Lipește mesajul suspect aici...",
      pasteUrl: "https://exemplu-suspect.com",
      uploadImage: "Apasă pentru a încărca o imagine",
      dragDrop: "sau trage și plasează aici",
      analyzeNow: "Analizează acum",
      analyzing: "Analizez...",
      freeAnalysis: "Analiza manuală este gratuită. Upgrade la Premium pentru protecție în timp real.",
      results: "Rezultate analiză",
      resultsWillAppear: "Rezultatele vor apărea aici după analiză",
      phishingDetected: "Phishing detectat",
      phishingDescription: "Acest mesaj este o tentativă clară de phishing care încearcă să fure datele de autentificare PayPal.",
      detectedIndicators: "Indicatori detectați:",
      recommendations: "Recomandări:",
      proTip: "Sfat Pro",
      proTipText: "Cu planul Premium, PhishGuard blochează automat astfel de amenințări înainte să ajungă la tine, monitorizând emailurile și navigarea în timp real.",
      freeAnalysesRemaining: "Analize gratuite rămase astăzi",
      scamsDetected: "Scamuri detectate în trial",
      daysRemaining: "Zile rămase în trial",
    },

    // Threat Alert
    threatAlert: {
      scamDetected: "⚠️ Înșelăciune Detectată",
      scamDescription: "Acest link este foarte probabil o tentativă de phishing care încearcă să se dea drept Raiffeisen Bank. NU accesa linkul și NU introduce date personale.",
      detectedIndicators: "Indicatori detectați:",
      recommendations: "Recomandări:",
      indicators: [
        "Domeniu suspect: 'banc-raiffeisen-verificare.xyz' nu este asociat cu Raiffeisen Bank",
        "Parametru 'urgent' folosit pentru a crea presiune psihologică",
        "TLD neobișnuit (.xyz) în loc de .ro sau .com",
        "Eroare de ortografie: 'banc' în loc de 'bank'",
        "Link distribuit prin WhatsApp (metodă comună de phishing)"
      ],
      recommendationsList: [
        "NU accesa linkul și NU introduce date personale",
        "Șterge mesajul primit",
        "Contactează banca direct la numărul oficial de pe site-ul raiffeisen.ro",
        "Raportează tentativa de phishing la CERT-RO",
        "Atenționează expeditorul că contul său ar putea fi compromis"
      ],
      phishingIndicators: [
        "URL fraudulos care mimează PayPal",
        "Creează urgență artificială (24 ore)",
        "Solicitare de date de autentificare",
        "Domeniu neautorizat (.xyz)",
        "Erori gramaticale și de ortografie"
      ],
      phishingRecommendations: [
        "NU accesați linkul din mesaj",
        "NU introduceți date personale",
        "Verificați contul direct de pe site-ul oficial al furnizorului",
        "Raportați mesajul la canalul oficial de suport",
        "Marcați mesajul ca spam"
      ],
    },

    // Pricing
    pricing: {
      title: "Alege planul potrivit pentru tine",
      subtitle: "Începe cu trial-ul gratuit pentru a testa analiza manuală, sau upgrade la Premium pentru protecție completă în timp real",
      whyPremium: "De ce Premium?",
      realTimeProtection: "Protecție în timp real",
      realTimeDesc: "Blochează automat amenințările înainte să interacționezi cu ele",
      emailMonitoring: "Monitorizare email",
      emailDesc: "Scanează automat toate emailurile primite pentru phishing",
      webAnalysis: "Analiza paginilor web",
      webDesc: "Verifică automat fiecare website pe care îl vizitezi",

      // Free Trial
      freeTrial: "Free Trial",
      freeTrialPeriod: "14 zile",
      freeTrialDesc: "Perfect pentru a testa PhishGuard",
      freeTrialFeatures: [
        "10 analize manuale pe zi",
        "Detectare phishing basic",
        "Rapoarte detaliate",
        "Suport comunitate",
        "Fără card necesar"
      ],
      startTrial: "Începe trial-ul",

      // Premium
      premium: "Premium",
      premiumPrice: "29 lei",
      month: "lună",
      premiumDesc: "Protecție completă pentru utilizatori activi",
      recommended: "Recomandat",
      premiumFeatures: [
        "✨ Analize manuale nelimitate",
        "✨ Protecție în timp real",
        "✨ Monitorizare email automată",
        "✨ Extensie browser integrată",
        "✨ Blocare automată amenințări",
        "Alerte instant",
        "Rapoarte avansate",
        "Suport prioritar 24/7"
      ],
      upgradeToPremium: "Upgrade la Premium",

      // Business
      business: "Business",
      businessPrice: "99 lei",
      businessDesc: "Pentru echipe și companii",
      businessFeatures: [
        "Tot din Premium, plus:",
        "Până la 10 utilizatori",
        "Dashboard centralizat",
        "Raportare amenințări la nivel de echipă",
        "Politici personalizate",
        "Integrări API",
        "Manager de cont dedicat",
        "Training securitate cibernetică"
      ],
      contactSales: "Contactează vânzări",

      // FAQ
      faq: "Întrebări Frecvente",
      faqQ1: "Ce înseamnă \"protecție în timp real\"?",
      faqA1: "PhishGuard monitorizează continuu emailurile tale, link-urile pe care dai click și website-urile pe care le vizitezi. Când detectăm o amenințare, o blocăm automat înainte să interacționezi cu ea.",
      faqQ2: "Pot folosi trial-ul fără card bancar?",
      faqA2: "Da! Trial-ul de 14 zile este complet gratuit și nu necesită card bancar. Vei avea acces la funcțiile de analiză manuală pentru a testa sistemul.",
      faqQ3: "Ce browsere sunt suportate?",
      faqA3: "Extensia PhishGuard funcționează pe Chrome, Firefox, Edge și Brave. Monitorizarea email funcționează cu Gmail, Outlook și Yahoo Mail.",
      faqQ4: "Pot anula oricând?",
      faqA4: "Absolut! Poți anula abonamentul oricând din setări. Nu există contracte pe termen lung sau taxe de anulare.",

      // CTA
      readyToProtect: "Gata să te protejezi de înșelăciuni?",
      ctaSubtitle: "Alătură-te celor peste 10,000 de utilizatori care se protejează zilnic cu PhishGuard",
      startFreeTrial: "Începe trial-ul gratuit",
      noCardRequired: "Fără card necesar • Anulare oricând",
    },

    // Footer
    footer: {
      tagline: "Protecție inteligentă împotriva phishing-ului și înșelăciunilor online.",
      product: "Produs",
      features: "Funcționalități",
      pricing: "Prețuri",
      browserExtension: "Extensie browser",
      api: "API",
      resources: "Resurse",
      blog: "Blog",
      securityGuides: "Ghiduri securitate",
      documentation: "Documentație",
      support: "Suport",
      legal: "Legal",
      terms: "Termeni și condiții",
      privacy: "Confidențialitate",
      cookies: "Cookies",
      rights: "© 2025 PhishGuard. Toate drepturile rezervate.",
      protecting: "Protejează peste 10,000 de utilizatori",
    },

    // Plan Dialog
    planDialog: {
      confirmPlan: "Confirmă abonamentul",
      subscribeTo: "Te abonezi la",
      email: "Email",
      trialIncluded: "Include 14 zile trial gratuit",
      noChargeNow: "Nu vei fi taxat acum. Poți anula oricând în primele 14 zile.",
      continue: "Continuă",
      paymentDetails: "Detalii plată",
      securePayment: "Plata ta este securizată și criptată",
      cardNumber: "Număr card",
      expiry: "Expirare",
      back: "Înapoi",
      processing: "Se procesează...",
      startTrial: "Începe trial-ul",
      success: "Abonament activat!",
      successMessage: "Vei primi un email de confirmare în curând.",
    },

    // Threats
    threats: {
      emailPhishing: "Tentativă de phishing prin email",
      suspiciousLink: "Link suspect detectat",
      fakePage: "Pagină falsă",
      suspiciousEmail: "Email suspect",
    },
  },

  en: {
    // Landing Page
    landing: {
      heroTitle: "Protect yourself from phishing and online scams",
      heroSubtitle: "PhishGuard uses AI to detect and block threats before it's too late",
      getStartedFree: "Get Started Free",
      signIn: "Sign In",
      watchDemo: "Watch Demo",
      trustedBy: "Trusted by",
      activeUsers: "over 10,000 active users",

      // Features
      howItWorks: "How it works",
      howItWorksSubtitle: "Complete protection in three simple steps",

      featureRealTime: "Real-time protection",
      featureRealTimeDesc: "Continuously monitor emails, links, and websites to protect you instantly",

      featureAI: "Advanced AI analysis",
      featureAIDesc: "Our machine learning algorithms detect new and sophisticated threats",

      featureBlock: "Automatic blocking",
      featureBlockDesc: "When we detect a threat, we automatically block it before you interact with it",

      // Stats
      statsTitle: "Proven protection",
      statsThreats: "Threats blocked monthly",
      statsAccuracy: "Detection accuracy",
      statsResponse: "Response time",
      statsUsers: "Protected users",

      // Use Cases
      useCasesTitle: "Who is PhishGuard for?",

      individuals: "Individuals",
      individualsDesc: "Protect your personal and financial data from phishing and online scams",

      businesses: "Businesses",
      businessesDesc: "Secure your team and company data with centralized protection and advanced reporting",

      families: "Families",
      familiesDesc: "Ensure online safety for the whole family with a single subscription",

      // Testimonials
      testimonialsTitle: "What our users say",

      testimonial1: "PhishGuard saved me from multiple phishing attempts. I feel safe browsing now!",
      testimonial1Author: "Ana Popescu",
      testimonial1Role: "Entrepreneur",

      testimonial2: "As an IT manager, PhishGuard reduced our security incidents by 95%. Excellent investment!",
      testimonial2Author: "Mihai Ionescu",
      testimonial2Role: "IT Manager",

      testimonial3: "The interface is simple and intuitive. I like that I get instant alerts when something is suspicious.",
      testimonial3Author: "Elena Radu",
      testimonial3Role: "Freelancer",

      // CTA
      ctaTitle: "Start protecting yourself today",
      ctaSubtitle: "7 days of Premium free, no card required",
      ctaButton: "Start free trial",
      ctaSecondary: "Contact sales",
      trialShortText: "7 days Premium free",
    },

    // Header
    header: {
      tagline: "AI Anti-Phishing Protection",
      dashboard: "Dashboard",
      analyze: "Manual Analysis",
      pricing: "Pricing",
      myAccount: "My Account",
      settings: "Settings",
      browserExtension: "Browser Extension",
      support: "Support",
      logout: "Logout",
      freePlan: "Free Plan",
      premiumPlan: "Premium Plan",
    },

    // Dashboard
    dashboard: {
      extensionInstalled: "Browser extension installed",
      extensionMonitoring: "PhishGuard is now monitoring your browsing in real-time. See alert demo below.",
      understood: "Got it",
      threatsBlocked: "Threats Blocked",
      emailsScanned: "Emails Scanned",
      detectionRate: "Detection Rate",
      timeSaved: "Time Saved",
      vsLastWeek: "vs last week",
      inLast30Days: "In the last 30 days",
      thisMonth: "This month",
      recentActivity: "Recent Activity",
      realTimeProtection: "Real-time protection active",
      all: "All",
      emails: "Emails",
      links: "Links",
      websites: "Websites",
      blocked: "Blocked",
      highRisk: "High risk",
      mediumRisk: "Medium risk",
      nowTime: "Now",
      minAgo: "min",
      hourAgo: "hour",
      hoursAgo: "hours",
      filteringEmails: "Filtering emails...",
      filteringLinks: "Filtering links...",
      filteringWebsites: "Filtering websites...",
    },

    // Browser Extension Popup
    extension: {
      threatDetected: "Threat detected",
      suspiciousLinkBlocked: "Suspicious link blocked",
      phishGuardBlocked: "PhishGuard has detected and blocked a potentially dangerous link on this page.",
      blockedUrl: "Blocked URL:",
      reason: "Reason:",
      suspiciousDomain: "Suspicious domain mimicking PayPal",
      unknownSSL: "Unknown SSL certificate",
      inPhishingDatabase: "Detected in phishing database",
      viewFullReport: "View full report",
      reportFalsePositive: "Report false positive",
      threatsBlockedToday: "Threats blocked today:",
    },

    // Manual Analysis
    manualAnalysis: {
      title: "Analyze suspicious content",
      description: "Submit links, messages, or screenshots for manual analysis",
      freeTrialActive: "Free Trial active",
      enterContent: "Enter content",
      text: "Text",
      url: "URL",
      image: "Image",
      pasteMessage: "Paste suspicious message here...",
      pasteUrl: "https://suspicious-example.com",
      uploadImage: "Click to upload an image",
      dragDrop: "or drag and drop here",
      analyzeNow: "Analyze now",
      analyzing: "Analyzing...",
      freeAnalysis: "Manual analysis is free. Upgrade to Premium for real-time protection.",
      results: "Analysis Results",
      resultsWillAppear: "Results will appear here after analysis",
      phishingDetected: "Phishing detected",
      phishingDescription: "This message is a clear phishing attempt trying to steal PayPal login credentials.",
      detectedIndicators: "Detected indicators:",
      recommendations: "Recommendations:",
      proTip: "Pro Tip",
      proTipText: "With the Premium plan, PhishGuard automatically blocks such threats before they reach you, monitoring emails and browsing in real-time.",
      freeAnalysesRemaining: "Free analyses remaining today",
      scamsDetected: "Scams detected in trial",
      daysRemaining: "Days remaining in trial",
    },

    // Threat Alert
    threatAlert: {
      scamDetected: "⚠️ Scam Detected",
      scamDescription: "This link is very likely a phishing attempt pretending to be Raiffeisen Bank. DO NOT access the link and DO NOT enter personal data.",
      detectedIndicators: "Detected indicators:",
      recommendations: "Recommendations:",
      indicators: [
        "Suspicious domain: 'banc-raiffeisen-verificare.xyz' is not associated with Raiffeisen Bank",
        "'urgent' parameter used to create psychological pressure",
        "Unusual TLD (.xyz) instead of .ro or .com",
        "Spelling error: 'banc' instead of 'bank'",
        "Link distributed via WhatsApp (common phishing method)"
      ],
      recommendationsList: [
        "DO NOT access the link and DO NOT enter personal data",
        "Delete the received message",
        "Contact the bank directly at the official number on raiffeisen.ro",
        "Report the phishing attempt to CERT-RO",
        "Warn the sender that their account may be compromised"
      ],
      phishingIndicators: [
        "Fraudulent URL mimicking PayPal",
        "Creates artificial urgency (24 hours)",
        "Requests authentication credentials",
        "Unauthorized domain (.xyz)",
        "Grammatical and spelling errors"
      ],
      phishingRecommendations: [
        "Check your account directly on the official service website",
        "Report the message to the official support channel",
        "Mark the message as spam"
      ],
    },

    // Pricing
    pricing: {
      title: "Choose the right plan for you",
      subtitle: "Start with a free trial to test manual analysis, or upgrade to Premium for complete real-time protection",
      whyPremium: "Why Premium?",
      realTimeProtection: "Real-time protection",
      realTimeDesc: "Automatically blocks threats before you interact with them",
      emailMonitoring: "Email monitoring",
      emailDesc: "Automatically scans all incoming emails for phishing",
      webAnalysis: "Web page analysis",
      webDesc: "Automatically checks every website you visit",

      // Free Trial
      freeTrial: "Free Trial",
      freeTrialPeriod: "14 days",
      freeTrialDesc: "Perfect for testing PhishGuard",
      freeTrialFeatures: [
        "10 manual analyses per day",
        "Basic phishing detection",
        "Detailed reports",
        "Community support",
        "No card required"
      ],
      startTrial: "Start trial",

      // Premium
      premium: "Premium",
      premiumPrice: "$7",
      month: "month",
      premiumDesc: "Complete protection for active users",
      recommended: "Recommended",
      premiumFeatures: [
        "✨ Unlimited manual analyses",
        "✨ Real-time protection",
        "✨ Automatic email monitoring",
        "✨ Integrated browser extension",
        "✨ Automatic threat blocking",
        "Instant alerts",
        "Advanced reports",
        "24/7 priority support"
      ],
      upgradeToPremium: "Upgrade to Premium",

      // Business
      business: "Business",
      businessPrice: "$25",
      businessDesc: "For teams and companies",
      businessFeatures: [
        "Everything in Premium, plus:",
        "Up to 10 users",
        "Centralized dashboard",
        "Team-level threat reporting",
        "Custom policies",
        "API integrations",
        "Dedicated account manager",
        "Cybersecurity training"
      ],
      contactSales: "Contact sales",

      // FAQ
      faq: "Frequently Asked Questions",
      faqQ1: "What does \"real-time protection\" mean?",
      faqA1: "PhishGuard continuously monitors your emails, links you click, and websites you visit. When we detect a threat, we automatically block it before you interact with it.",
      faqQ2: "Can I use the trial without a credit card?",
      faqA2: "Yes! The 14-day trial is completely free and doesn't require a credit card. You'll have access to manual analysis features to test the system.",
      faqQ3: "Which browsers are supported?",
      faqA3: "The PhishGuard extension works on Chrome, Firefox, Edge, and Brave. Email monitoring works with Gmail, Outlook, and Yahoo Mail.",
      faqQ4: "Can I cancel anytime?",
      faqA4: "Absolutely! You can cancel your subscription anytime from settings. There are no long-term contracts or cancellation fees.",

      // CTA
      readyToProtect: "Ready to protect yourself from scams?",
      ctaSubtitle: "Join over 10,000 users who protect themselves daily with PhishGuard",
      startFreeTrial: "Start free trial",
      noCardRequired: "No card required • Cancel anytime",
    },

    // Footer
    footer: {
      tagline: "Intelligent protection against phishing and online scams.",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      browserExtension: "Browser Extension",
      api: "API",
      resources: "Resources",
      blog: "Blog",
      securityGuides: "Security Guides",
      documentation: "Documentation",
      support: "Support",
      legal: "Legal",
      terms: "Terms & Conditions",
      privacy: "Privacy",
      cookies: "Cookies",
      rights: "© 2025 PhishGuard. All rights reserved.",
      protecting: "Protecting over 10,000 users",
    },

    // Plan Dialog
    planDialog: {
      confirmPlan: "Confirm subscription",
      subscribeTo: "Subscribe to",
      email: "Email",
      trialIncluded: "Includes 14-day free trial",
      noChargeNow: "You will not be charged now. You can cancel anytime within the first 14 days.",
      continue: "Continue",
      paymentDetails: "Payment details",
      securePayment: "Your payment is secure and encrypted",
      cardNumber: "Card number",
      expiry: "Expiry",
      back: "Back",
      processing: "Processing...",
      startTrial: "Start trial",
      success: "Subscription activated!",
      successMessage: "You will receive a confirmation email shortly.",
    },

    // Threats
    threats: {
      emailPhishing: "Email phishing attempt",
      suspiciousLink: "Suspicious link detected",
      fakePage: "Fake page",
      suspiciousEmail: "Suspicious email",
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
