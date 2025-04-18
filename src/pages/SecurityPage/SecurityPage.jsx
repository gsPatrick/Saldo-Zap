// src/pages/SecurityPage/SecurityPage.jsx
import React from 'react';
import Header from '../../componentsLP/Header/Header';             // Header da LP
import SecuritySection from '../../componentsLP/SecuritySection/SecuritySection'; // O componente de segurança
import FooterLP from '../../componentsLP/Footer/Footer';         // Footer da LP
import './SecurityPage.css';                               // Estilos (mínimos) da página

const SecurityPage = () => {
  return (
    <div className="security-page-container">
      <Header />
      <main className="security-page-main-content">
        {/* A seção de segurança é o conteúdo principal */}
        <SecuritySection />
         {/* Você pode adicionar mais conteúdo específico aqui se necessário */}
      </main>
      <FooterLP />
    </div>
  );
};

export default SecurityPage;