// =============================================================================
// data/site.ts
// -----------------------------------------------------------------------------
// Sitenin tüm METİN İÇERİKLERİNİN (TR/EN) ve genel ayarların (e-posta, sosyal
// medya linkleri, navigasyon menüsü) tutulduğu tek merkezi dosya.
//
// Neden burada toplanıyor?
//  - Sections.tsx / Navbar.tsx içindeki bileşenler bu dosyadan veri "import"
//    ederek okur. Böylece bir metni değiştirmek için component kodunu
//    karıştırmaya gerek kalmaz; sadece bu dosyadaki ilgili alanı güncellemek
//    yeterlidir.
//  - Her obje hem "tr" (Türkçe) hem "en" (İngilizce) anahtarına sahiptir;
//    kullanıcı Navbar'daki dil butonuyla ikisi arasında geçiş yapabilir.
//
// `as const` kullanımı: TypeScript'e bu verilerin salt-okunur (readonly) ve
// literal tipte olduğunu söyler. Bu sayede `copy.tr.name` gibi erişimlerde
// tip güvenliği (autocomplete + hata yakalama) sağlanır.
//
// GENEL KURAL — "ne değişirse ne olur?":
//  - Bir metni (title/desc/q/a gibi) değiştirmek → sadece o metin ekranda
//    değişir, hiçbir bileşen kodunu etkilemez, site anında güncellenir.
//  - Bir diziye YENİ ELEMAN eklemek (örn. features.tr'ye 7. bir özellik) →
//    Sections.tsx'teki ilgili bölüm bunu OTOMATİK olarak grid'e ekler
//    (çünkü kod `.map()` ile diziyi geziyor, sabit sayı beklemiyor).
//  - Bir eleman SİLMEK → o kart/soru/adım sitede hiç görünmez olur.
//  - "tr" ve "en" dizilerinin uzunluklarını FARKLI tutarsan (örn. tr'de 6,
//    en'de 4 özellik) sorun çıkmaz ama iki dildeki içerik sayısı görsel
//    olarak tutarsız görünür (grid'in dolgunluğu dile göre değişir).
// =============================================================================

// -----------------------------------------------------------------------------
// copy: Sayfanın ana metinleri (başlık, açıklama, buton yazıları, footer notu)
// Hero bölümü ve Footer bileşeni burayı kullanır.
// -----------------------------------------------------------------------------
export const copy = {
  tr: {
    name: "LumosMind", // Marka adı → Navbar (logo yanı) ve Footer'da (sol üst) görünür
    tagline: "Epilepsi için gerçek zamanlı geri bildirim ve kriz öncesi erken uyarı.", // Hero'daki ANA BAŞLIK (H1) — değiştirirsen sayfanın en büyük/ilk okunan metni değişir
    description:
      "Giyilebilir sensörlerden gelen sinyalleri akıllı algoritmalarla analiz ederek, kullanıcıya anlaşılır uyarılar ve bakım ekibine güvenli bildirim akışı sunan bir erken uyarı platformu.", // Hero alt açıklaması (H1'in hemen altındaki paragraf)
    ctaPrimary: "Demo Talep Et", // Ana buton metni → Navbar + Hero + Mobil menü + ContactCTA'daki "Özelliklere Dön" YANINDAKİ ana buton hariç, hepsinde AYNI metin kullanılır. Burayı değiştirince TÜM bu yerlerdeki buton metni birlikte değişir.
    ctaSecondary: "Nasıl Çalışır?", // Hero'daki ikincil buton metni (sadece Hero'da kullanılır)
    footerNote: "© LumosMind. Tüm hakları saklıdır.", // Footer'daki telif hakkı satırı — yılı elle güncellemen gerekir, otomatik değişmez (örn. "© 2026 LumosMind" yapmak istersen elle yazmalısın)
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

// -----------------------------------------------------------------------------
// site: Dile bağlı olmayan genel site ayarları.
//  - email: mailto: linklerinde ve iletişim metninde kullanılır (WaitlistForm,
//    ContactCTA, Footer). BU TEK ALANI DEĞİŞTİRMEK, sitedeki TÜM e-posta
//    linklerini (3 farklı yerde) aynı anda günceller.
//  - social: Instagram/LinkedIn profil linkleri. ContactCTA ve Footer'daki
//    sosyal medya ikonları buradan URL çeker. Buradaki URL'yi değiştirmek
//    her iki yerdeki linki de aynı anda günceller.
//    ⚠️ Placeholder linkler: gerçek hesap URL'lerinle değiştirmen gerekiyor.
//  - nav: Navbar'da görünen menü linkleri (TR ve EN ayrı ayrı, çünkü etiketler
//    dile göre değişiyor ama href'ler aynı kalıyor).
//    ⚠️ href değerleri (örn. "#product") Sections.tsx'teki section'ların
//    `id` prop'larıyla EŞLEŞMEK ZORUNDA. Burada href'i değiştirip
//    Sections.tsx'teki ilgili id'yi değiştirmezsen (veya tam tersi), o menü
//    linki tıklandığında hiçbir yere kaydırma yapmaz (kırık link gibi davranır).
// -----------------------------------------------------------------------------
export const site = {
  email: "lumosmind48@gmail.com",
  social: {
    // TODO: gerçek linklerinle değiştir
    instagram: "https://instagram.com/lumosmind_",
    linkedin: "https://www.linkedin.com/in/lumosmind-teknoloji-4221b33b3/",
  },
  nav: {
    tr: [
      { label: "Ürün", href: "#product" },       // Product bileşenine (id="product") kaydırır
      { label: "Nasıl Çalışır", href: "#how" },   // HowItWorks bileşenine (id="how") kaydırır
      { label: "Kullanım", href: "#use" },        // UseCases bileşenine (id="use") kaydırır
      { label: "SSS", href: "#faq" },             // FAQ bileşenine (id="faq") kaydırır
    ],
    en: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "Use cases", href: "#use" },
      { label: "FAQ", href: "#faq" },
    ],
  },
} as const;

// -----------------------------------------------------------------------------
// features: "Product" bölümündeki özellik kartlarının içeriği.
// Sections.tsx -> Product() component'i bu diziyi map'leyerek kart grid'i basar.
// NE DEĞİŞİRSE NE OLUR?
//  - Yeni bir { title, desc } eklersen → Product bölümünde YENİ BİR KART
//    otomatik belirir (grid 2 veya 3 sütuna göre kendini ayarlar, elle
//    grid düzeni ayarlamana gerek yok).
//  - title/desc metnini değiştirirsen → sadece o kartın yazısı değişir.
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// steps: "Nasıl Çalışır" (HowItWorks) bölümündeki adımlık akış.
// Her adım index'e göre "01", "02", "03" şeklinde numaralandırılıyor (Sections.tsx içinde).
// NE DEĞİŞİRSE NE OLUR?
//  - Yeni bir adım eklersen (4. eleman) → grid otomatik "md:grid-cols-3"
//    olduğundan 4. kart alt satıra taşar (3'lü grid); numarası otomatik "04" olur.
//  - Adımların SIRASINI (dizideki yerini) değiştirirsen, numaralandırma da
//    (01, 02, 03) o yeni sıraya göre otomatik kayar.
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// useCases: "Kullanım" (UseCases) bölümündeki hedef kitle/senaryo kartları.
// Yapı features/steps ile birebir aynı mantıkta çalışır (map + kart).
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// faqs: "SSS" (FAQ) bölümündeki soru/cevap listesi.
// Sections.tsx içinde her biri açılır/kapanır <details> elemanı olarak render edilir.
// NE DEĞİŞİRSE NE OLUR?
//  - Yeni bir { q, a } eklersen → FAQ listesine yeni bir açılır/kapanır
//    satır eklenir (JS gerekmez, native <details> kullanılıyor).
//  - Sıralamayı değiştirirsen → sorular ekranda o yeni sırayla listelenir.
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// screenshots: "Ürün Kanıtı" bölümündeki mockup kartlarının başlık/açıklaması.
// Görselin kendisi henüz yok; Sections.tsx içinde boş bir "placeholder" kutu
// (h-28 rounded-2xl border) gösteriliyor.
// NE DEĞİŞİRSE NE OLUR?
//  - title/desc değiştirmek sadece metni değiştirir; gerçek bir mockup
//    GÖRSELİ eklemek istersen bu dosyada değil Sections.tsx -> Screenshots()
//    içindeki placeholder <div>'i bir <img>/<Image> ile DEĞİŞTİRMEN gerekir.
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// team: "Ekip & Güven" (TeamSection) bölümündeki ekip/iş birliği kartları.
// NE DEĞİŞİRSE NE OLUR?
//  - Yeni bir üye/ekip eklersen (3. eleman) → grid "md:grid-cols-2" olduğu
//    için 3. kart alt satıra kayar (2'li grid).
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// trust: Hero bölümünün altındaki küçük "güven rozetleri" (pill/badge) listesi.
// NE DEĞİŞİRSE NE OLUR?
//  - Diziye eleman eklersen/çıkarırsan Hero'daki rozet SAYISI değişir; rozetler
//    `flex-wrap` olduğu için sığmayanlar otomatik alt satıra kayar (tasarım
//    bozulmaz).
//  - Diziyi TAMAMEN BOŞ ([]) bırakırsan, Sections.tsx'teki
//    `trustList?.length ? (...) : null` kontrolü sayesinde bu bölüm HİÇ
//    render edilmez (boş bir kutu görünmez).
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// stats: Hero bölümündeki istatistik kutucukları (k: kısa etiket, v: değer/açıklama).
// NE DEĞİŞİRSE NE OLUR?
//  - `k` = büyük/kalın gösterilecek kısa kelime (örn. "Anlık"),
//    `v` = onun altındaki açıklama (örn. "Sinyal analizi"). Grid
//    "sm:grid-cols-3" olduğu için idealde 3 eleman ile en düzgün görünüm elde edilir;
//    4 veya daha fazla eleman eklersen son kutu(lar) alt satıra taşar.
// -----------------------------------------------------------------------------
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
