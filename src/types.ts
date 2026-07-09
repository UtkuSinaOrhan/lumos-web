// =============================================================================
// types.ts
// -----------------------------------------------------------------------------
// Projede paylaşılan TypeScript tip tanımlarının (interface/type) tutulduğu
// dosya. Şu an sadece Navbar menüsündeki bir öğenin şeklini tanımlıyor.
// =============================================================================

// NavItem: Navbar.tsx içindeki menü linklerinin (site.ts -> site.nav.tr/en
// dizilerindeki her eleman) tipini tanımlar.
//
//   label -> Kullanıcının ekranda GÖRDÜĞÜ metin (örn. "Ürün", "SSS").
//   href  -> Tıklanınca gidilecek link (örn. "#product"). "#" ile başlayan
//            değerler aynı sayfada o id'ye sahip bölüme kaydırma yapar.
//
// NE DEĞİŞİRSE NE OLUR?
//  - Buraya yeni bir alan eklersen (örn. `icon?: string`), TypeScript
//    site.ts'teki nav dizilerinde de o alanı ister/kabul eder; Navbar.tsx'te
//    de `n.icon` ile erişebilirsin.
//  - `href` tipini `string` yerine daha kısıtlı bir union (örn.
//    `"#product" | "#how" | "#use" | "#faq"`) yaparsan, sadece bu 4 değerden
//    biri kabul edilir; yanlış yazılmış bir link (typo) derleme anında hata
//    verir. Esnekliği azaltır ama hata riskini düşürür.
export interface NavItem {
  label: string;
  href: string;
}
