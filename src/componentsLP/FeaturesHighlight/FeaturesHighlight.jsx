// src/componentsLP/FeaturesHighlight.jsx
import React from 'react';
import './FeaturesHighlight.css';
import {
  WhatsAppOutlined,
  BulbOutlined, // Para IA
  BarChartOutlined, // Para Análise
  CreditCardOutlined, // Para Pagamentos
  FileTextOutlined, // Para Relatórios
  LockOutlined // Para Segurança
} from '@ant-design/icons'; // Importa ícones do Ant Design

const FeaturesHighlight = () => {
  // Array de features com ícones Ant Design
  const features = [
    { name: "WhatsApp", IconComponent: WhatsAppOutlined },
    { name: "Inteligência Artificial", IconComponent: BulbOutlined },
    { name: "Análise de Dados", IconComponent: BarChartOutlined },
    { name: "Pagamentos Seguros", IconComponent: CreditCardOutlined },
    { name: "Relatórios Automáticos", IconComponent: FileTextOutlined },
    { name: "Segurança", IconComponent: LockOutlined }
  ];

  return (
    <div className="features-highlight-section">
      {/* Mensagem/Título adicionado aqui */}
      <h3 className="features-highlight-title">
        Nossa Plataforma Utiliza Tecnologias Essenciais:
      </h3>

      <div className="features-highlight-content">
        {features.map(({ name, IconComponent }) => ( // Desestrutura para pegar o componente
          <div key={name} className="feature-item">
            {/* Renderiza o componente de ícone passado */}
            <IconComponent className="feature-antd-icon" />
            <span className="feature-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesHighlight;