// src/componentsLP/InteractiveCardSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Para navegação interna
import './InteractiveCardSection.css';
import {
  AppstoreOutlined, // Funcionalidades
  SafetyCertificateOutlined, // Segurança
  TagsOutlined,     // Planos
  QuestionCircleOutlined, // FAQ
  ArrowRightOutlined // Ícone de seta
} from '@ant-design/icons';

// Componente auxiliar para gráfico simples (opcional)
const MiniGraphPlaceholder = () => (
    <svg viewBox="0 0 50 20" className="mini-graph-svg">
         <path d="M 0 18 Q 10 5, 20 12 T 40 8 L 50 15" stroke="rgba(84, 148, 92, 0.7)" strokeWidth="1.5" fill="none" />
         <path d="M 0 20 L 0 18 Q 10 5, 20 12 T 40 8 L 50 15 L 50 20 Z" fill="rgba(84, 148, 92, 0.1)" />
    </svg>
);


const InteractiveCardSection = () => {
  const cardData = [
    {
      key: 'features',
      icon: <AppstoreOutlined />,
      title: "Funcionalidades",
      description: "Explore como nossa IA e integração com WhatsApp simplificam seu controle financeiro.",
      link: "/funcionalidades", // Rota definida no App.jsx
      showGraph: true,
    },
    {
      key: 'security',
      icon: <SafetyCertificateOutlined />,
      title: "Segurança",
      description: "Entenda as medidas que tomamos para proteger seus dados e garantir sua privacidade.",
      link: "/seguranca", // Rota definida no App.jsx
      showGraph: false,
    },
    {
      key: 'plans',
      icon: <TagsOutlined />,
      title: "Planos e Preços",
      description: "Veja os detalhes de cada plano e escolha a opção ideal para suas necessidades.",
      link: "/planos", // Rota definida no App.jsx
      showGraph: false,
    },
    {
      key: 'faq',
      icon: <QuestionCircleOutlined />,
      title: "Perguntas Frequentes",
      description: "Encontre respostas rápidas para as dúvidas mais comuns sobre o Saldo Zap.",
      link: "/faq", // Rota definida no App.jsx
      showGraph: true,
    },
  ];

  return (
    <section className="interactive-card-section">
      <h2 className="interactive-card-section-title">Explore o Saldo Zap</h2>
      <p className="interactive-card-section-subtitle">
        Navegue pelas seções abaixo para conhecer mais sobre nossa solução.
      </p>

      <div className="interactive-cards-grid">
        {cardData.map((card) => (
          // Link envolvendo todo o card
          <Link to={card.link} key={card.key} className="interactive-card-link">
            <div className="interactive-card-item">
               {/* Ícone Principal */}
              <div className="interactive-card-icon-wrapper">
                {card.icon}
              </div>
               {/* Conteúdo textual */}
              <h3 className="interactive-card-title">{card.title}</h3>
              <p className="interactive-card-description">{card.description}</p>
              {/* Mini gráfico opcional e link "Saiba Mais" */}
              <div className="interactive-card-footer">
                 {card.showGraph && <MiniGraphPlaceholder />}
                <span className="interactive-card-cta">
                  Saiba Mais <ArrowRightOutlined className="cta-arrow-icon"/>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InteractiveCardSection;