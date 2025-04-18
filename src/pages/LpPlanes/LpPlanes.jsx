// src/pages/LpPlanes/LpPlanes.jsx
import React from 'react';
import Header from '../../componentsLP/Header/Header'; // Importa o Header da Landing Page
import HeroSection from '../../componentsLP/HeroSection/HeroSection';
import FeaturesHighlight from '../../componentsLP/FeaturesHighlight/FeaturesHighlight';
import PricingSection from '../../componentsLP/PricingSection/PricingSection';
import ContactSection from '../../componentsLP/ContactSection/ContactSection';
import DetailedPricing  from '../../componentsLP/DetailedPricing/DetailedPricing';
import FooterLP from '../../componentsLP/Footer/Footer'; // <<< IMPORTAR O FOOTER NOVO

// <<< IMPORTAR
import './LpPlanes.css';                                    // Importa os estilos específicos da página

const LpPlanes = () => {
  return (
    <div className="lp-planes-page-container"> {/* Container principal da página */}
      <Header /> {/* Renderiza o Header */}

      <main className="lp-planes-main-content">
        {/* O conteúdo principal desta página é a seção de preços detalhada */}
        <DetailedPricing />

        {/* Seção de contato/dúvidas */}
        <ContactSection />
      </main>

      {/* Footer simples para consistência */}
        <FooterLP /> {/* <<< SUBSTITUIR O FOOTER ANTIGO */}
    </div>
  );
};

export default LpPlanes;