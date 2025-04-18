// src/pages/FeaturesPage/FeaturesPage.jsx
import React from 'react';
import Header from '../../componentsLP/Header/Header';         // Header da Landing Page
import DetailedFeaturesSection from '../../componentsLP/DetailedFeaturesSection/DetailedFeaturesSection'; // O componente que acabamos de criar
import FooterLP from '../../componentsLP/Footer/Footer';     // Footer da Landing Page
import './FeaturesPage.css';                           // Estilos da página (se necessários)

const FeaturesPage = () => {
  return (
    <div className="features-page-container">
      <Header />
      <main className="features-page-main-content">
        {/* A seção de features detalhadas é o conteúdo principal */}
        <DetailedFeaturesSection />
        {/* Poderia adicionar um CTA extra aqui se quisesse */}
      </main>
      <FooterLP />
    </div>
  );
};

export default FeaturesPage;