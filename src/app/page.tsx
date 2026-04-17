import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { BrandRibbon } from "@/components/site/brand-ribbon";
import { Experience } from "@/components/site/experience";
import { Agencies } from "@/components/site/agencies";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <BrandRibbon />
      <Experience />
      <Agencies />
      <Contact />
      <Footer />
    </main>
  );
}
