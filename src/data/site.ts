export const copy = {
  tr: {
    name: "LumosMind",
    tagline: "Epilepsi için gerçek zamanlı geri bildirim ve kriz öncesi erken uyarı.",
    description:
      "Giyilebilir sensörlerden gelen sinyalleri akıllı algoritmalarla analiz ederek, kullanıcıya anlaşılır uyarılar ve bakım ekibine güvenli bildirim akışı sunan bir erken uyarı platformu.",
    ctaPrimary: "Demo Talep Et",
    ctaSecondary: "Nasıl Çalışır?",
    footerNote: "© LumosMind. Tüm hakları saklıdır.",
  },
  en: {
    name: "LumosMind",
    tagline: "Real-time feedback and early seizure warning.",
    description:
      "LumosMind analyzes wearable signals with intelligent algorithms to provide clear alerts for users and a secure notification flow for caregivers.",
    ctaPrimary: "Request Demo",
    ctaSecondary: "How It Works?",
    footerNote: "© LumosMind. All rights reserved.",
  },
} as const;

export const site = {
  email: "lumosmind48@gmail.com",
  nav: {
    tr: [
      { label: "Ürün", href: "#product" },
      { label: "Nasıl Çalışır", href: "#how" },
      { label: "Kullanım", href: "#use" },
      { label: "SSS", href: "#faq" },
    ],
    en: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "Use cases", href: "#use" },
      { label: "FAQ", href: "#faq" },
    ],
  },
} as const;

export const features = {
  tr: [
    {
      title: "Erken Uyarı Sinyalleri",
      desc: "Sinyal örüntülerini analiz ederek olası kriz öncesi risk seviyesini anlaşılır şekilde gösterir.",
    },
    {
      title: "Gerçek Zamanlı Geri Bildirim",
      desc: "Kullanıcıya sade uyarılar, bakım verenlere güvenli bildirim akışı.",
    },
    {
      title: "Kişiselleştirme",
      desc: "Kullanıcının verisine göre adaptif eşikler ve kişiye özel trendler.",
    },
    {
      title: "Güvenli Veri Akışı",
      desc: "Minimum veri prensibiyle, gizlilik odaklı tasarım ve kontrollü paylaşım.",
    },
    {
      title: "Mobil Uygulama Deneyimi",
      desc: "Hızlı erişim, net ekranlar, kritik anlarda tek dokunuş.",
    },
    {
      title: "Klinik ve Araştırma İçin Uygun",
      desc: "İzlenebilir metrikler, raporlama ve iyileştirmeye açık mimari.",
    },
  ],
  en: [
    {
      title: "Early Warning Signals",
      desc: "Analyzes signal patterns to present pre-seizure risk levels in a clear, actionable way.",
    },
    {
      title: "Real-time Feedback",
      desc: "Simple alerts for users and a secure notification flow for caregivers.",
    },
    {
      title: "Personalization",
      desc: "Adaptive thresholds and personalized trends based on each user’s data.",
    },
    {
      title: "Secure Data Flow",
      desc: "Privacy-first design: minimal data, controlled sharing, secure transport, and access management.",
    },
    {
      title: "Mobile App Experience",
      desc: "Fast access, clear screens, and one-tap actions during critical moments.",
    },
    {
      title: "Clinical & Research Ready",
      desc: "Trackable metrics, reporting, and an architecture designed to evolve with validation needs.",
    },
  ],
} as const;

export const steps = {
  tr: [
    { title: "Sensör Verisi", desc: "Bileklik/kulaklık gibi giyilebilir cihazlardan sinyal akışı alınır." },
    { title: "Akıllı Analiz", desc: "Model, örüntüleri yakalar ve risk skorunu gerçek zamanlı günceller." },
    { title: "Uyarı ve Yönlendirme", desc: "Kullanıcıya anlaşılır bildirim; ihtiyaç halinde bakım ekibine paylaşım." },
  ],
  en: [
    { title: "Wearable Signals", desc: "Signals are captured from wearables such as a wristband or earbuds." },
    { title: "Intelligent Analysis", desc: "The model detects patterns and updates the risk score in real time." },
    { title: "Alerts & Guidance", desc: "Clear notifications for the user; optional sharing with caregivers when needed." },
  ],
} as const;

export const useCases = {
  tr: [
    { title: "Günlük Yaşamda Güven", desc: "Kullanıcı kriz riskini daha iyi yönetir; belirsizlik azalır." },
    { title: "Bakım Veren Bildirimleri", desc: "İsteğe bağlı, kontrollü paylaşım ve hızlı aksiyon akışı." },
    { title: "Klinik İzlem", desc: "Trendler ve dönemsel raporlarla daha anlamlı takip." },
  ],
  en: [
    { title: "Confidence in Daily Life", desc: "Users can manage risk more effectively and reduce uncertainty." },
    { title: "Caregiver Notifications", desc: "Optional, controlled sharing and faster response workflows." },
    { title: "Clinical Monitoring", desc: "Meaningful follow-up with trends and periodic reporting." },
  ],
} as const;

export const faqs = {
  tr: [
    {
      q: "LumosMind tıbbi cihaz mı?",
      a: "Bu landing page demo amaçlıdır. Regülasyon ve klinik doğrulama süreçleri ürünün hedeflerine göre belirlenir.",
    },
    {
      q: "Hangi sensörleri destekliyor?",
      a: "MVP aşamasında hedef cihaz ve sinyal türleri projeye göre seçilir. Mimari, farklı sensörlere genişletilebilir şekilde tasarlanır.",
    },
    {
      q: "Veriler nasıl korunuyor?",
      a: "Gizlilik odaklı tasarım: minimum veri, kontrollü paylaşım, güvenli iletim ve erişim yönetimi.",
    },
    {
      q: "Ne zaman kullanıma hazır olur?",
      a: "Pilot ve MVP takvimi ekip/cihaz/klinik iş birliğine göre değişir. Demo talep ederek kapsamı netleştirebilirsiniz.",
    },
  ],
  en: [
    {
      q: "Is LumosMind a medical device?",
      a: "This landing page is for demo purposes. Regulatory and clinical validation pathways depend on the product scope and intended use.",
    },
    {
      q: "Which sensors are supported?",
      a: "In the MVP phase, target devices and signal types are selected based on the project. The architecture is designed to extend to multiple sensors.",
    },
    {
      q: "How is data protected?",
      a: "Privacy-first by design: minimal data, controlled sharing, secure transmission, and access management.",
    },
    {
      q: "When will it be available?",
      a: "Pilot and MVP timelines vary by team, device, and clinical collaboration. Request a demo to align on scope and plan.",
    },
  ],
} as const;

export const screenshots = {
  tr: [
    { title: "Risk Çizelgesi", desc: "Risk seviyesini zaman içinde izleyin, kritik değişimleri yakalayın." },
    { title: "Eylem Rehberi", desc: "Kullanıcıya sade ve anlaşılır önerilerle yönlendirme." },
    { title: "Bakıcı Paylaşımı", desc: "İsteğe bağlı paylaşım: kime/ne zaman/ne kadar kontrolü." },
  ],
  en: [
    { title: "Risk Timeline", desc: "Track risk over time and spot critical changes early." },
    { title: "Action Guidance", desc: "Clear, simple guidance to help users act confidently." },
    { title: "Caregiver Sharing", desc: "Optional sharing with full control over who/when/how much." },
  ],
} as const;

export const team = {
  tr: [
    {
      name: "SignalSense Team",
      role: "Yazılım Mühendisliği • Makine Öğrenmesi • Mobil",
      desc: "Erken uyarı, kullanıcı deneyimi ve güvenli veri akışı odağında ürün geliştirme.",
    },
    {
      name: "Klinik İş Birliği",
      role: "Pilot / doğrulama odaklı yaklaşım tasarımı",
      desc: "Klinik doğrulama ve regülasyon süreçlerine uyumlu ilerleme hedefi.",
    },
  ],
  en: [
    {
      name: "SignalSense Team",
      role: "Software Engineering • ML • Mobile",
      desc: "Building with a focus on early warning, user experience, and secure data flows.",
    },
    {
      name: "Clinical Collaboration",
      role: "Pilot / validation-ready approach",
      desc: "Designed to progress with clinical validation and regulatory alignment in mind.",
    },
  ],
} as const;

export const trust = {
  tr: [
    "AI destekli risk puanlaması",
    "Taşınabilir sinyal veri yolu",
    "Gizlilik odaklı mimari",
    "Klinik iş birliği için tasarlandı",
  ],
  en: [
    "AI-assisted risk scoring",
    "Wearable signal pipeline",
    "Privacy-first architecture",
    "Designed for clinical collaboration",
  ],
} as const;

export const stats = {
  tr: [
    { k: "Anlık", v: "Sinyal analizi" },
    { k: "Erken", v: "Uyarı bilgisi" },
    { k: "Güvenli", v: "Kontrollü paylaşım" },
  ],
  en: [
    { k: "Real-time", v: "Signal analysis" },
    { k: "Early", v: "Warning insights" },
    { k: "Secure", v: "Controlled sharing" },
  ],
} as const;