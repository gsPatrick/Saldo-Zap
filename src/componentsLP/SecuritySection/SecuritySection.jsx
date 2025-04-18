// src/componentsLP/SecuritySection.jsx
import React from 'react';
import './SecuritySection.css';
import {
  LockOutlined,          // Criptografia / Geral
  FileProtectOutlined,   // Privacidade / LGPD
  SafetyCertificateOutlined, // Pagamentos / Confiança
  WhatsAppOutlined,      // Segurança da Plataforma
  DatabaseOutlined,      // Segurança de Dados
  AuditOutlined          // Conformidade / Práticas
} from '@ant-design/icons';

const SecuritySection = () => {
  const securityPoints = [
    {
      icon: <LockOutlined />,
      title: "Criptografia Forte",
      description: "Suas mensagens e dados financeiros são protegidos usando criptografia robusta, tanto em trânsito quanto em repouso em nossos servidores seguros."
    },
    {
      icon: <FileProtectOutlined />,
      title: "Privacidade e LGPD",
      description: "Levamos sua privacidade a sério. Seguimos as diretrizes da Lei Geral de Proteção de Dados (LGPD) e nunca compartilhamos ou vendemos seus dados."
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "Pagamentos Seguros",
      description: "Processamos pagamentos através de gateways confiáveis e seguros (como Kiwify, Hotmart). Seus dados de cartão nunca ficam armazenados conosco."
    },
    {
      icon: <WhatsAppOutlined />,
      title: "Segurança da Plataforma",
      description: "Utilizamos a segurança nativa do WhatsApp, incluindo a criptografia de ponta-a-ponta nas suas conversas diretas com o bot."
    },
     {
      icon: <DatabaseOutlined />,
      title: "Proteção de Dados",
      description: "Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição."
    },
     {
      icon: <AuditOutlined />,
      title: "Melhores Práticas",
      description: "Estamos constantemente atualizando nossas práticas e sistemas para seguir os padrões mais recentes de segurança da informação."
    }
  ];

  return (
    <section className="security-section-component">
      <h2 className="security-section-title">Sua Segurança é Nossa Prioridade</h2>
      <p className="security-section-subtitle">
        Entendemos a importância dos seus dados financeiros. Veja como protegemos você:
      </p>

      <div className="security-points-grid">
        {securityPoints.map((point, index) => (
          <div key={index} className="security-point-item">
            <div className="security-icon-wrapper">
              {point.icon}
            </div>
            <h3 className="security-point-title">{point.title}</h3>
            <p className="security-point-description">{point.description}</p>
          </div>
        ))}
      </div>
       {/* Opcional: Link para a Política de Privacidade */}
       <div className="privacy-link-prompt">
            Para mais detalhes, consulte nossa <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
       </div>
    </section>
  );
};

export default SecuritySection;