// =============================================================================
// components/AppProvider.tsx
// -----------------------------------------------------------------------------
// React Context kullanarak "aktif dil" (tr/en) bilgisini tüm bileşen ağacına
// prop-drilling yapmadan (yani her bileşene tek tek `lang` prop'u geçirmeden)
// dağıtan basit bir global state yönetimi.
//
// Nasıl çalışır?
//  1) <AppProvider> bileşeni, içindeki tüm çocukları (`children`) sarar.
//  2) İçeride `useState` ile `lang` state'i tutulur (başlangıç: "tr").
//  3) Context.Provider ile bu state + değiştirme fonksiyonu (`setLang`) tüm
//     alt bileşenlere "yayınlanır".
//  4) Herhangi bir alt bileşen `useApp()` hook'unu çağırarak bu değerlere
//     erişebilir (örn. Navbar.tsx, Sections.tsx içindeki her section).
//
// PageShell.tsx içinde en dışta <AppProvider> ile sarmalanmış durumda; yani
// Navbar ve tüm Section bileşenleri bu context'in İÇİNDE render edilir.
// =============================================================================

"use client"; // Bu dosya tarayıcıda (client) çalışır; React state/hook (useState,
              // useContext) kullandığı için Next.js'in sunucu bileşeni olamaz.

import { createContext, useContext, useEffect, useState } from "react";

// Desteklenen diller. Yeni bir dil eklemek istersen (örn. Almanca) buraya
// "de" eklemen ve site.ts'teki HER içerik objesine (copy, features, steps,
// vb.) "de" anahtarını eklemen gerekir — aksi halde `copy[lang]` gibi
// erişimlerde TypeScript hata verir.
type Lang = "tr" | "en";

// Theme tipi tanımlanmış ama şu an hiçbir yerde kullanılmıyor (ileride
// açık/koyu tema seçimini kullanıcıya bıraksaydık burada kullanılacaktı).
type Theme = "dark" | "light";

// Context'in taşıyacağı değerlerin şekli: aktif dil + dili değiştiren fonksiyon.
type AppContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

// Context'in kendisi. Başlangıç değeri `null` — bu yüzden aşağıda
// useApp() içinde "Provider'ın dışında kullanılırsa hata fırlat" kontrolü var.
const AppContext = createContext<AppContextType | null>(null);

// AppProvider: Uygulamanın (veya bir alt ağacın) etrafını sarıp dil state'ini
// sağlayan bileşen. PageShell.tsx içinde <AppProvider>...</AppProvider>
// şeklinde kullanılıyor.
//
// NE DEĞİŞİRSE NE OLUR?
//  - useState<Lang>("tr") -> useState<Lang>("en") yaparsan site artık
//    VARSAYILAN olarak İngilizce açılır (kullanıcı yine Navbar'daki
//    butonla Türkçe'ye geçebilir).
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");


  return (
    <AppContext.Provider value={{ lang, setLang}}>
      {children}
    </AppContext.Provider>
  );
}

// useApp: Context'e erişmek için kullanılan özel (custom) hook.
// Örnek kullanım: `const { lang, setLang } = useApp();`
//
// Neden `if (!ctx) throw ...` var?
//  Eğer bir bileşen <AppProvider> ile SARILMAMIŞ bir yerde bu hook'u
//  çağırırsa (yani Context değeri hâlâ `null` ise), hatayı sessizce
//  yutmak yerine geliştiriciye AÇIK bir hata mesajı gösterip "bunu
//  AppProvider içinde kullanmalısın" der. Bu, hatanın kaynağını bulmayı
//  kolaylaştıran bilinçli bir güvenlik önlemidir.
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
