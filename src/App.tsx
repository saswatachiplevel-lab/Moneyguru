import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketTicker } from './components/MarketTicker';
import { FinancialNewsSection } from './components/FinancialNewsSection';
import { QuickTrustStrip } from './components/QuickTrustStrip';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { CalculatorsSection } from './components/CalculatorsSection';
import { FeaturedGuidance } from './components/FeaturedGuidance';
import { BeginnerJourney } from './components/BeginnerJourney';
import { BlogSection } from './components/BlogSection';
import { PartnerSection } from './components/PartnerSection';
import { ContactConsultationSection } from './components/ContactConsultationSection';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { PartnerModal } from './components/PartnerModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { LegalModals } from './components/LegalModals';

import { servicesData } from './data/servicesData';
import { FinancialService, BlogPost } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<FinancialService | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('General Financial Guidance');

  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToJourney = () => {
    const elem = document.getElementById('journey');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceById = (id: string) => {
    const found = servicesData.find((s) => s.id === id);
    if (found) {
      setSelectedService(found);
    } else {
      scrollToServices();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#092532] selection:bg-[#C9F24A] selection:text-[#071D29]">
      
      {/* Floating Capsule Header */}
      <Navbar
        onOpenConsultation={(service) => scrollToContact(service)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenPartner={() => setIsPartnerOpen(true)}
      />

      {/* Main Page Flow per Specification */}
      <main>
        {/* 1. Dark Atmospheric Hero with Dual-Device Visual */}
        <Hero
          onOpenConsultation={() => scrollToContact()}
          onOpenHowItWorks={scrollToJourney}
        />

        {/* 1b. Real-Time Simulated Market Indices Ticker Strip */}
        <MarketTicker onOpenConsultation={(service) => scrollToContact(service)} />

        {/* 1c. Google Search Grounded Daily Financial News Headlines */}
        <FinancialNewsSection onOpenConsultation={(topic) => scrollToContact(topic)} />

        {/* 2. Quick Service & Consultation Feature Strip */}
        <QuickTrustStrip
          onLearnMore={scrollToServices}
          onSelectService={handleSelectServiceById}
        />

        {/* 3. Editorial Split About Us Section */}
        <AboutSection
          onLearnMore={scrollToServices}
          onOpenConsultation={() => scrollToContact()}
        />

        {/* 4. Qualitative Trust Metrics & Statistics */}
        <StatsSection />

        {/* 5. 7-Category Financial Services Grid */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenConsultation={(serviceName) => scrollToContact(serviceName)}
        />

        {/* 6. Interactive SIP & Loan EMI Calculators */}
        <CalculatorsSection
          onOpenConsultation={(service) => scrollToContact(service)}
        />

        {/* 7. Featured Guidance Dark Panel with Checklist */}
        <FeaturedGuidance
          onOpenConsultation={() => scrollToContact()}
        />

        {/* 8. Dedicated Beginner Investor Journey (4 Steps) */}
        <BeginnerJourney
          onOpenConsultation={() => scrollToContact()}
        />

        {/* 9. Financial Insights & Editorial Blog Cards */}
        <BlogSection
          onSelectPost={(post) => setSelectedPost(post)}
        />

        {/* 10. Partner With Us Collaboration Section */}
        <PartnerSection
          onOpenPartnerModal={() => setIsPartnerOpen(true)}
        />

        {/* 11. Consultation Lead Generation Form (Connected to Firestore) */}
        <ContactConsultationSection
          preselectedService={preselectedService}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* 12. Collapsible FAQ Section (Mutual Funds, Insurance, Loans) */}
        <FaqSection
          onOpenConsultation={(service) => scrollToContact(service)}
        />

        {/* 13. Final High-Contrast CTA Banner */}
        <FinalCtaBanner
          onOpenConsultation={() => scrollToContact()}
          onExploreServices={scrollToServices}
        />
      </main>

      {/* 13. Comprehensive Multi-Column Footer with Disclaimers */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenDisclaimer={() => setLegalModalType('disclaimer')}
        onOpenConsultation={(service) => scrollToContact(service)}
        onSelectServiceById={handleSelectServiceById}
        onOpenPartner={() => setIsPartnerOpen(true)}
      />

      {/* Modals & Overlays */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookConsultation={(serviceTitle) => scrollToContact(serviceTitle)}
      />

      <BlogDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onBookConsultation={() => scrollToContact()}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      <ClientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onBookNewConsultation={() => scrollToContact()}
      />

      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
