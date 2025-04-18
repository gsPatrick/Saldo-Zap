// src/componentsLP/PricingSection.jsx
import React from 'react';
import './PricingSection.css';
import { Button } from 'antd';
import { ArrowRightOutlined, CheckCircleFilled, SmileOutlined, StarOutlined, CrownOutlined } from '@ant-design/icons';

const PricingSection = () => {
  const plans = [
    {
      name: 'Free',
      icon: <SmileOutlined />,
      price: 'Grátis',
      priceSuffix: '/ 7 dias',
      features: [
        'Registro de gastos/receitas via WhatsApp',
        'Consultas básicas de saldo',
        'Alertas de vencimento simples',
        'Suporte por IA limitado',
      ],
      ctaText: 'Começar Teste Grátis',
      isFeatured: false,
    },
    {
      name: 'Basic',
      icon: <StarOutlined />,
      price: 'R$ 9,90', // Exemplo de preço
      priceSuffix: '/ mês',
      features: [
        'Tudo do Free, mais:',
        'Relatórios semanais detalhados',
        'Categorização inteligente aprimorada',
        'Registro por foto (limitado)',
        'Suporte via chat',
      ],
      ctaText: 'Escolher Basic',
      isFeatured: false, // Ou true se quiser destacar este
    },
    {
      name: 'Premium',
      icon: <CrownOutlined />,
      price: 'R$ 29,90', // Exemplo de preço
      priceSuffix: '/ mês',
      features: [
        'Tudo do Basic, mais:',
        'Análise de padrões e recomendações IA',
        'Registro por áudio e fotos ilimitado',
        'Gestão de parcelas e recorrentes',
        'Relatórios financeiros completos',
        'Suporte prioritário',
      ],
      ctaText: 'Escolher Premium',
      isFeatured: true, // Destaca o plano premium
    },
  ];

  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Escolha o Plano Ideal para Você</h2>
      <p className="pricing-subtitle">Comece gratuitamente por 7 dias e desbloqueie todo o potencial do Saldo Zap.</p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.isFeatured ? 'featured' : ''}`}>
            <div className="plan-icon-wrapper">
              {plan.icon}
            </div>
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price-container">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-price-suffix">{plan.priceSuffix}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex}>
                  <CheckCircleFilled className="feature-check-icon" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* Botão individual opcional por card */}
             {/*
            <Button
              type={plan.isFeatured ? 'primary' : 'default'}
              className="plan-individual-cta"
              href="/signup" // Ajustar link
            >
              {plan.ctaText}
            </Button>
             */}
          </div>
        ))}
      </div>

      {/* Call to Action Central */}
      <div className="pricing-cta-container">
        <Button
          type="primary"
          size="large"
          className="pricing-main-cta-button"
          icon={<ArrowRightOutlined />}
          href="/signup" // Ajustar link para a página/modal de cadastro
        >
          Experimente Saldo Zap por 7 Dias Grátis
        </Button>
      </div>
    </section>
  );
};

export default PricingSection;