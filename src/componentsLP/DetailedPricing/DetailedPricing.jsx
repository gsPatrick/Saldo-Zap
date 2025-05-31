// src/componentsLP/DetailedPricing.jsx
import React from 'react';
import './DetailedPricing.css'; // Certifique-se que o CSS correspondente existe
import { Button } from 'antd';
// Re-importando SmileOutlined e mantendo os outros necessários
import { CheckCircleFilled, SmileOutlined, CalendarOutlined, ThunderboltFilled } from '@ant-design/icons';

const DetailedPricing = () => {
  // Define as funcionalidades comuns aos planos PAGOS
  const commonPaidFeatures = [
    '**Todos os Recursos de IA**',
    'Registro Ilimitado',
    'Relatórios Detalhados (Semanal, Mensal)',
    'Categorização Automática Inteligente',
    'Análise de Padrões e Insights',
    'Alertas e Agendamentos Ilimitados',
    'Reconhecimento de Notas Fiscais',
    'Gestão de Parcelamentos e Recorrentes',
    'Suporte Prioritário via WhatsApp',
  ];

  // Define os planos (Free, Mensal, Anual)
  const plans = [
   
    {
      id: 'mensal',
      name: 'Plano Mensal',
      icon: <CalendarOutlined />,
      description: 'Flexibilidade total com pagamento mês a mês e acesso completo.',
      price: 'R$ 21,90',
      priceSuffix: '/ mês',
      features: commonPaidFeatures, // Usa as features comuns dos planos pagos
      ctaText: 'Assinar Mensal',
      ctaLink: 'https://pay.kirvano.com/fbeae57f-6abf-4593-a60c-e97d12e74857', // Rota para checkout mensal
      isFeatured: false,
      badgeText: null,
    },
    {
      id: 'anual',
      name: 'Plano Anual',
      icon: <ThunderboltFilled />,
      description: 'Economize pagando uma vez por ano e aproveite todos os benefícios.',
      price: 'R$ 15,00',
      priceSuffix: '/ ano',
      features: [
           ...commonPaidFeatures, // Inclui todas as features comuns
           '**Desconto Exclusivo Anual**' // Feature extra de destaque
       ],
      ctaText: 'Assinar Anual (Economize!)',
      ctaLink: 'https://pay.kirvano.com/2b1b309f-53ba-4be6-9573-d4759596f4a5', // Rota para checkout anual
      isFeatured: true, // Destaca o plano anual
      badgeText: 'Melhor Valor',
    },
  ];

   // Função para renderizar features, destacando o texto em negrito
   const renderFeature = (feature, index) => {
    const parts = feature.split('**');
    return (
      <li key={index}>
        <CheckCircleFilled className="detailed-feature-check-icon" />
        <span>
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </span>
      </li>
    );
  };

  return (
    <section id="planos" className="detailed-pricing-section">
      <h2 className="detailed-pricing-title">Escolha Seu Plano Saldo Zap</h2>
      <p className="detailed-pricing-subtitle">
         Comece com <strong>7 dias gratuitos</strong> para testar tudo sem compromisso ou escolha direto o plano ideal para você!
      </p>

      {/* Grid agora renderiza 3 cards */}
      <div className="detailed-pricing-grid three-plans"> {/* Classe pode ser ajustada ou removida se o CSS for geral */}
        {plans.map((plan) => (
          <div key={plan.id} className={`detailed-plan-card ${plan.isFeatured ? 'featured' : ''}`}>
             {plan.badgeText && (
              <div className="plan-badge">
                {/* Renderiza o ícone do plano no badge se ele existir */}
                {plan.icon && React.cloneElement(plan.icon, { style: { marginRight: '5px', fontSize: '0.9em'} })}
                {plan.badgeText}
              </div>
            )}
            <div className="detailed-plan-header">
              <div className={`detailed-plan-icon-wrapper plan-icon-${plan.id}`}>
                {plan.icon}
              </div>
              <h3 className="detailed-plan-name">{plan.name}</h3>
              <div className="detailed-plan-price-container">
                <span className="detailed-plan-price">{plan.price}</span>
                {plan.priceSuffix && <span className="detailed-plan-price-suffix">{plan.priceSuffix}</span>}
                 {plan.id === 'anual' && (
                    <span className="annual-equivalent-price">(equivale a R$ 180,00 no PIX)</span>
                 )}
              </div>
              <p className="detailed-plan-description">{plan.description}</p>
            </div>

            <ul className="detailed-plan-features">
               {plan.features.map(renderFeature)} {/* Usa a função renderFeature */}
            </ul>

            <Button
              // Botão 'default' para Free e Mensal, 'primary' para Anual
              type={plan.isFeatured ? 'primary' : 'default'}
              // Adiciona classe específica do plano ao botão também
              className={`detailed-plan-cta-button cta-button-${plan.id}`}
              href={plan.ctaLink}
              size="large"
            >
              {plan.ctaText}
            </Button>
             <p className="plan-cta-subtext">
               {plan.id === 'free' ? 'Sem cartão, sem compromisso.' : plan.id === 'anual' ? 'Pagamento único anual.' : 'Cobrança mensal recorrente.'}
               {plan.id !== 'free' && ' Cancele quando quiser.'} {/* Só adiciona cancelamento para pagos */}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedPricing;