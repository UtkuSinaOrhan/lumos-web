"use client";

import Navbar from "./Navbar";
import {
  Hero,
  Product,
  HowItWorks,
  UseCases,
  Screenshots,
  TeamSection,
  FAQ,
  Waitlist,
  ContactCTA,
  Footer,
} from "./Sections";
import { LayoutGroup } from "framer-motion";

export default function PageShell() {
  return (
    <LayoutGroup>
      <main className="min-h-screen text-white">
        <Navbar />
        <Hero />
        <Product />
        <HowItWorks />
        <UseCases />
        <Screenshots />
        <TeamSection />
        <FAQ />
        <Waitlist />
        <ContactCTA />
        <Footer />
      </main>
    </LayoutGroup>
  );
}