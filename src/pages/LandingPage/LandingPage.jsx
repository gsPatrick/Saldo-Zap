// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import Header from '../../componentsLP/Header/Header'; // Importa o Header da Landing Page
import HeroSection from '../../componentsLP/HeroSection/HeroSection';
import FeaturesHighlight from '../../componentsLP/FeaturesHighlight/FeaturesHighlight';
import PricingSection from '../../componentsLP/PricingSection/PricingSection';
import ContactSection from '../../componentsLP/ContactSection/ContactSection'; // <<< IMPORTAR
import DetailedPricing  from '../../componentsLP/DetailedPricing/DetailedPricing';
import HowItWorksSection from '../../componentsLP/HowItWorksSection/HowItWorksSection'; // <<< IMPORTAR
import FooterLP from '../../componentsLP/Footer/Footer'; // <<< IMPORTAR O FOOTER NOVO
import InteractiveCardSection from '../../componentsLP/InteractiveCardSection/InteractiveCardSectionJsx'; // <<< ADD THIS LINE
import FinalCTASection from '../../componentsLP/FinalCTASection/FinalCTASection'; // <<< IMPORTAR

import './LandingPage.css'; // Importa os estilos específicos da Landing Page

const LandingPage = () => {
  return (
    <div className="lp-container"> {/* Container principal da Landing Page */}
      <Header /> {/* Renderiza o Header */}
      <HeroSection /> {/* Renderiza o Header */}
      <FeaturesHighlight />
      <DetailedPricing />
        <HowItWorksSection /> {/* <<< IMPORTAR */}
        <InteractiveCardSection /> {/* <<< ADICIONAR A SEÇÃO DE CARDS */}

      <ContactSection /> 
        <FinalCTASection /> {/* <<< IMPORTAR */}
      <FooterLP /> {/* <<< SUBSTITUIR O FOOTER ANTIGO */}

    </div>
  );
};

export default LandingPage;