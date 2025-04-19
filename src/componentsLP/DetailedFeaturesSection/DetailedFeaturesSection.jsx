// src/componentsLP/DetailedFeaturesSection.jsx
import React from 'react';
import './DetailedFeaturesSection.css';
import {
  MessageOutlined, CameraOutlined, AudioOutlined, BarChartOutlined,
  BulbOutlined, FieldTimeOutlined, SafetyCertificateOutlined, CheckCircleOutlined,
  WhatsAppOutlined, // Para o chat simulado
} from '@ant-design/icons';

// Componente auxiliar para o gráfico de placeholder (similar ao da Hero)
const PlaceholderChart = ({ type = 'area' }) => {
    if (type === 'bar') {
        return (
            <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" className="placeholder-svg">
                <rect x="10" y="30" width="15" height="30" fill="#54945c" rx="2"/>
                <rect x="35" y="15" width="15" height="45" fill="#6aa870" rx="2"/>
                <rect x="60" y="25" width="15" height="35" fill="#54945c" rx="2"/>
                <rect x="85" y="10" width="15" height="50" fill="#adedb1" rx="2"/>
            </svg>
        );
    }
     // Default to area chart
    return (
        <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet" className="placeholder-svg">
            <path d="M 0 50 Q 15 20, 30 35 T 60 30 T 90 45 L 100 50 L 100 60 L 0 60 Z" fill="rgba(84, 148, 92, 0.3)" />
            <path d="M 0 55 Q 15 30, 30 40 T 60 38 T 90 50 L 100 55 L 100 60 L 0 60 Z" fill="rgba(84, 148, 92, 0.6)" />
            <path d="M 0 55 Q 15 30, 30 40 T 60 38 T 90 50 L 100 55" stroke="#adedb1" strokeWidth="2" fill="none"/>
        </svg>
    );
};

// Componente auxiliar para simular o chat
const PlaceholderChat = ({ messages }) => (
    <div className="visual-chat-simulation">
        <div className="chat-header-sim">
            <WhatsAppOutlined/> Contato Saldo Zap
        </div>
        <div className="chat-messages-sim">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble-sim ${msg.type}`}>
                    {msg.text}
                </div>
            ))}
        </div>
    </div>
);


const DetailedFeaturesSection = () => {
  const featuresData = [
    {
      icon: <MessageOutlined />,
      title: "Registro Simplificado via Chat",
      description: "Esqueça planilhas! Envie uma mensagem simples como 'Gastei R$50 no mercado' e o Saldo Zaporganiza tudo.",
      benefit: "Economize tempo e registre gastos na hora, sem esforço.",
      align: "left", 
      visualType: "chat", // << NOVO
      visualData: [       // << NOVO
          { type: 'user', text: 'Gastei 50 reais no mercado hoje' },
          { type: 'bot', text: '✅ Registrado: R$ 50,00 em Alimentação.'}
      ]
    },
    // {
    //   icon: <CameraOutlined />, // Mantido, mas pode trocar se quiser
    //   title: "Comprovantes e Formatos Flexíveis",
    //   description: "Não quer digitar? Envie a foto do seu comprovante ou uma mensagem de áudio. Nossa IA extrai os dados para você.",
    //   benefit: "Flexibilidade total para registrar suas finanças como preferir.",
    //   align: "right",
    //   visualType: "chat", // << NOVO (simulando a resposta após envio)
    //   visualData: [       // << NOVO
    //       { type: 'user', text: '[Foto de Comprovante] Mercado XYZ' },
    //       { type: 'bot', text: '📄 Comprovante recebido! Registrando R$ 125,30 em Alimentação...'}
    //   ]
    // },
    {
      icon: <BarChartOutlined />,
      title: "Relatórios e Análises Visuais",
      description: "Peça resumos diários, semanais, mensais ou por categoria. Entenda para onde seu dinheiro está indo com gráficos claros.",
      benefit: "Tenha clareza total sobre suas finanças para tomar decisões melhores.",
      align: "left",
      visualType: "graph", // << NOVO
      visualData: { type: 'bar' } // << NOVO (especifica tipo de gráfico)
    },
    {
      icon: <BulbOutlined />,
      title: "Inteligência Artificial Pessoal",
      description: "O Saldo Zap aprende seus hábitos, categoriza despesas automaticamente e oferece insights personalizados para economizar.",
      benefit: "Receba ajuda proativa da IA para otimizar seu orçamento sem pensar.",
      align: "right",
      visualType: "chat", // << NOVO
      visualData: [       // << NOVO
          { type: 'bot', text: '💡 Percebi um aumento nos gastos com Lazer este mês. Gostaria de ver um detalhamento?'},
          { type: 'user', text: 'Sim, por favor!'}
      ]
    },
    {
      icon: <FieldTimeOutlined />,
      title: "Alertas e Agendamentos",
      description: "Nunca mais esqueça uma conta! Defina lembretes de vencimento e gerencie pagamentos recorrentes ou parcelados.",
      benefit: "Evite multas e mantenha suas contas em dia com planejamento fácil.",
      align: "left",
       visualType: "chat", // << NOVO
      visualData: [       // << NOVO
          { type: 'user', text: 'Lembrar de pagar aluguel dia 5' },
          { type: 'bot', text: '🔔 Alerta definido! Pagamento de Aluguel para 05/MM.'},
          { type: 'bot', text: '⏰ Lembrete: Aluguel vence amanhã!'}
      ] 
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "Segurança em Primeiro Lugar",
      description: "Seus dados são protegidos com criptografia e as melhores práticas de segurança. Sua privacidade é nossa prioridade.",
      benefit: "Tenha tranquilidade sabendo que suas informações financeiras estão seguras.",
      align: "right",
      visualType: "graph", // << NOVO
      visualData: { type: 'area' } // << NOVO (pode ser outro tipo ou ícone grande)
    }
  ];

  return (
    <section className="detailed-features-section">
      <h2 className="detailed-features-main-title">Funcionalidades Poderosas, Controle Fácil</h2>
      <p className="detailed-features-main-subtitle">
        Descubra como cada recurso do Saldo Zap foi pensado para simplificar sua vida financeira.
      </p>

      <div className="features-list-container">
        {featuresData.map((feature, index) => (
          <div key={index} className={`feature-row align-${feature.align}`}>
            {/* Container do Visual (Agora condicional) */}
            <div className="feature-visual-container">
              {feature.visualType === 'chat' && <PlaceholderChat messages={feature.visualData} />}
              {feature.visualType === 'graph' && <PlaceholderChart type={feature.visualData?.type} />}
              {/* Adicione mais tipos se necessário */}
            </div>

            {/* Container do Texto (Permanece igual) */}
            <div className="feature-text-container">
               <div className="feature-icon-title">
                  {React.cloneElement(feature.icon, { className: 'feature-title-icon' })}
                  <h3 className="feature-title">{feature.title}</h3>
               </div>
              <p className="feature-description">{feature.description}</p>
              <p className="feature-benefit">
                <CheckCircleOutlined className="benefit-icon"/>
                <strong>Benefício Principal:</strong> {feature.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;