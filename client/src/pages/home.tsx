import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.getAttribute("id") || "";
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-chalk-body relative">
      {/* Fixed Navigation */}
      <Navigation activeSection={activeSection} />
      
      {/* Main content with top padding to account for fixed navbar */}
      <div className="relative z-10 pt-20">
        <HeroSection />
        <div className="section-divider"></div>
        <AboutSection />
        <div className="section-divider"></div>
        <SkillsSection />
        <div className="section-divider"></div>
        <ProjectsSection />
        <div className="section-divider"></div>
        <ContactSection />
        
        <footer className="py-8 relative">
          <div className="container mx-auto px-4 text-center">
            {/* Chalk line above footer */}
            <div className="section-divider mb-6"></div>
            <p className="font-chalk-body chalk-text text-lg">
              © 2024 Amarnath S S. 
              <span className="chalk-underline ml-2">Crafted with chalk and code</span>
            </p>
            {/* Decorative chalk marks */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="w-8 h-1 bg-chalk transform rotate-12 opacity-60"></div>
              <div className="w-2 h-2 bg-chalk rounded-full opacity-70"></div>
              <div className="w-6 h-1 bg-chalk transform -rotate-6 opacity-50"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
