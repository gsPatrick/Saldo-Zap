// src/componentsLP/HowItWorksSection.jsx
import React from 'react';
import './HowItWorksSection.css';
import { WhatsAppOutlined, EditOutlined, BarChartOutlined, BulbOutlined } from '@ant-design/icons';

const HowItWorksSection = () => {
  const steps = [
    { icon: <WhatsAppOutlined />, title: "Conecte-se", description: "Cadastro rápido com seu WhatsApp. Inicie a conversa com nosso bot." },
    { icon: <EditOutlined />, title: "Registre Facilmente", description: "Envie seus gastos e receitas por texto ou áudio." },
    { icon: <BarChartOutlined />, title: "Analise Seus Dados", description: "Peça resumos e entenda seus hábitos financeiros." },
    { icon: <BulbOutlined />, title: "Receba Insights", description: "Nossa IA te envia alertas e dicas personalizadas para você economizar." },
  ];

  // Caminho para o vídeo na pasta 'public'.
  const videoPath = "/saldozap.mp4";

  return (
    <section className="how-it-works-section">
      <h2 className="how-it-works-title">Simples Assim: Controle Total no WhatsApp</h2>
      <p className="how-it-works-subtitle">
        Veja como é fácil transformar sua gestão financeira com o Saldo Zap em poucos passos.
      </p>

      <div className="how-it-works-content">
        {/* Coluna dos Passos */}
        <div className="how-it-works-steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <div className="step-text-content">
                <h3 className="step-title">{index + 1}. {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coluna do Vídeo Local */}
        <div className="how-it-works-video-container">
          {/* Tag <video> para renderizar o vídeo local */}
          <video
            className="embedded-video-iframe" // Reutilizando a classe CSS para manter o estilo
            src={videoPath}
            title="Demonstração Saldo Zap"
            autoPlay  // Inicia o vídeo automaticamente
            loop      // Repete o vídeo quando termina
            muted     // Necessário para o autoplay funcionar na maioria dos navegadores
            playsInline // Evita que o vídeo abra em tela cheia no iOS
            controls  // Mostra os controles de play/pause, volume, etc.
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;