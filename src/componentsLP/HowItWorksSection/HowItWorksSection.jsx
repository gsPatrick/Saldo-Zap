// src/componentsLP/HowItWorksSection.jsx
import React from 'react';
import './HowItWorksSection.css';
import { WhatsAppOutlined, EditOutlined, BarChartOutlined, BulbOutlined } from '@ant-design/icons'; // PlayCircleFilled não é mais necessário aqui

const HowItWorksSection = () => {
  const steps = [
    { icon: <WhatsAppOutlined />, title: "Conecte-se", description: "Cadastro rápido com seu WhatsApp. Inicie a conversa com nosso bot." },
    { icon: <EditOutlined />, title: "Registre Facilmente", description: "Envie seus gastos e receitas por texto, áudio." },
    { icon: <BarChartOutlined />, title: "Analise Seus Dados", description: "Peça resumos, e entenda seus hábitos financeiros." },
    { icon: <BulbOutlined />, title: "Receba Insights", description: "Nossa IA te envia alertas e dicas personalizadas para você economizar." },
  ];

  // <<< IMPORTANTE: Substitua pela URL de *embed* do seu vídeo >>>
  // Exemplo YouTube: Vá no vídeo > Compartilhar > Incorporar > copie apenas a URL do atributo 'src'
  const videoEmbedUrl = "https://youtube.com/shorts/bmbbCbpvT94?si=O6zM_rU4fpyLXzsN"; // <<< SUBSTITUA AQUI!

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

        {/* Coluna do Vídeo Embedado */}
        <div className="how-it-works-video-container">
          {/* Iframe para incorporar o vídeo */}
          <iframe
            className="embedded-video-iframe" // Classe para estilização
            src={videoEmbedUrl}
            title="Demonstração Saldo Zap" // Título acessível
            frameBorder="0" // Remove borda padrão
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Permissões recomendadas
            allowFullScreen // Permite tela cheia
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;