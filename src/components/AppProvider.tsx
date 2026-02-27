"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "tr" | "en";
type Theme = "dark" | "light";

type AppContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");


  return (
    <AppContext.Provider value={{ lang, setLang}}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}