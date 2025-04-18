// src/componentsLP/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Importa os estilos CSS
import { Button } from 'antd'; // Usaremos o Button do AntD para consistência
import { WhatsAppOutlined, ArrowRightOutlined } from '@ant-design/icons'; // Ícones relevantes
import { Link } from 'react-router-dom'; // <<< IMPORTAR Link

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Gerencie suas Finanças Pelo <span className="hero-highlight">WhatsApp</span> com Saldo Zap
        </h1>
        <p className="hero-description">
          Seu assistente financeiro inteligente: registre gastos e receitas, receba análises e alertas personalizados conversando com nosso bot. Simples, rápido e adaptado a você.
        </p>
        {/* <<< BOTÃO AGORA É UM LINK PARA /signup >>> */}
        <Link to="/signup"> {/* Usa o Link para navegação SPA */}
            <Button
              type="primary"
              size="large"
              className="hero-cta-button"
              // onClick não é mais necessário aqui se for apenas navegação
              icon={<ArrowRightOutlined />}
            >
              Experimente Grátis por 7 Dias
            </Button>
        </Link>
        {/* <<< FIM DA MUDANÇA >>> */}
        <p className="hero-subtext">Cadastro rápido com seu número e e-mail.</p>
      </div>

      {/* --- HERO VISUALS (sem alterações) --- */}
      <div className="hero-visuals">
        <div className="visual-card visual-card-main">
           <div className="card-title">Relatório Semanal <span className="card-date">AGO 21 - AGO 26</span></div>
           <div className="chart-placeholder area-chart-placeholder">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M 0 30 Q 15 10, 30 25 T 60 20 T 90 35 L 100 38 L 100 40 L 0 40 Z" fill="rgba(84, 148, 92, 0.4)" />
                <path d="M 0 35 Q 15 20, 30 30 T 60 28 T 90 38 L 100 40 L 100 40 L 0 40 Z" fill="rgba(84, 148, 92, 0.7)" />
             </svg>
           </div>
           <div className="chart-labels">
                <span>AGO 21</span><span>AGO 22</span><span>AGO 23</span><span>AGO 24</span><span>AGO 25</span><span>AGO 26</span>
           </div>
        </div>
        <div className="visual-card visual-card-secondary">
            <div className="card-title">Gastos Mensais</div>
             <div className="chart-placeholder donut-chart-placeholder">
                <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4a8351" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a8d8ac" strokeWidth="3" strokeDasharray="60, 40" strokeDashoffset="25"></circle>
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="30, 70" strokeDashoffset="-15"></circle>
                </svg>
                <div className="donut-center-text">R$ 500</div>
             </div>
        </div>
         <div className="visual-card visual-card-secondary">
            <div className="card-title">Frequência</div>
             <div className="chart-placeholder line-chart-placeholder">
                 <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M 5 25 Q 20 10, 35 20 T 65 15 T 95 30" stroke="#54945c" strokeWidth="2" fill="none"/>
                 </svg>
             </div>
             <div className="chart-labels">
                <span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SAB</span>
             </div>
        </div>
         <div className="visual-card whatsapp-card">
            <WhatsAppOutlined style={{ fontSize: '1.5em', color: '#25D366', marginRight: '8px' }}/>
            <div className="whatsapp-text">
                <p className="user-msg">Gastei R$50 no mercado.</p>
                <p className="bot-msg">Registrado: R$50 em Alimentação ✅</p>
            </div>
         </div>
      </div>
      {/* --- FIM HERO VISUALS --- */}
    </section>
  );
};

export default HeroSection;