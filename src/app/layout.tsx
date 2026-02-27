import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LumosMind — Epilepsi için erken uyarı ve geri bildirim",
  description:
    "LumosMind, giyilebilir sensör verisini gerçek zamanlı analiz ederek kriz öncesi erken uyarı ve anlaşılır geri bildirim sağlar.",
  openGraph: {
    title: "LumosMind",
    description:
      "Epilepsi için gerçek zamanlı geri bildirim ve kriz öncesi erken uyarı.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className="bg-white text-black dark:bg-[#0b0f2a] dark:text-white transition-colors duration-300">        {children}
      </body>
    </html>
  );
}