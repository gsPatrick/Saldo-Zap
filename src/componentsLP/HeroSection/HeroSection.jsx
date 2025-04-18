// src/componentsLP/HeroSection.jsx
import React from 'react';
import './HeroSection.css'; // Importa os estilos CSS
import { Button } from 'antd'; // Usaremos o Button do AntD para consistência
import { WhatsAppOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons'; // Ícones relevantes
import { Link } from 'react-router-dom';

// <<< COPIADO DE PhoneMockupSection.jsx >>>
// Dados simulados da conversa
const chatMessages = [
  { type: 'bot-structured', data: { title: "Registro de Transação Concluído:", details: [ { icon: '📝', label: 'Descrição', value: 'Salário' }, { icon: '💰', label: 'Valor', value: 'R$ 1.000,00' }, { icon: '📊', label: 'Tipo', value: 'Receita' }, { icon: '🏦', label: 'Conta', value: 'Sicoob' }, { icon: '📅', label: 'Data', value: '11/09/2024' }, ] }, timestamp: '11:50' },
  { type: 'user', text: 'Paguei 12000 reais Televisão crédito Santander em 12x', timestamp: '11:50', status: 'read' },
  { type: 'bot', text: 'Ok, processando isso agora... ⏳', timestamp: '11:50' },
  { type: 'bot-structured', data: { title: "Detalhes da Transação Registrada:", details: [ { icon: '📺', label: 'Descrição', value: 'Televisão' }, { icon: '💰', label: 'Valor', value: 'R$ 12.000,00 em 12x' }, { icon: '💸', label: 'Tipo', value: 'Despesa' }, { icon: '💳', label: 'Cartão', value: 'Santander' }, { icon: '📅', label: 'Data', value: '17/09/2024' }, ] }, timestamp: '11:50' },
  { type: 'user', text: 'Recebi 1412 reais Salário na conta Santander', timestamp: '11:50', status: 'read' },
  { type: 'bot', text: 'Recebido com sucesso, estou processando. 🎉', timestamp: '11:50' },
];

// Componente para renderizar a mensagem estruturada
const StructuredMessage = ({ data }) => (
    <div className="structured-msg-content">
        <p className="structured-msg-title">{data.title}</p>
        {data.details.map((item, index) => (
            <p key={index} className="structured-msg-detail">
                <span className="detail-icon">{item.icon}</span>
                <span className="detail-label">{item.label}:</span>{' '}
                <span className="detail-value">{item.value}</span>
            </p>
        ))}
    </div>
);
// <<< FIM COPIADO >>>


const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Coluna do Texto (sem alterações) */}
      <div className="hero-content">
        <h1 className="hero-title">
          Gerencie suas Finanças Pelo <span className="hero-highlight">WhatsApp</span> Usando Inteligência Artificial com Saldo Zap
        </h1>
        <p className="hero-description">
          Seu assistente financeiro inteligente: registre gastos e receitas, receba análises e alertas personalizados conversando com nosso bot. Simples, rápido e adaptado a você.
        </p>
        <Link to="/signup">
            <Button
              type="primary"
              size="large"
              className="hero-cta-button"
              icon={<ArrowRightOutlined />}
            >
              Experimente Grátis por 7 Dias
            </Button>
        </Link>
        <p className="hero-subtext">Cadastro rápido com seu número e e-mail.</p>
      </div>

      {/* --- Coluna Visual AGORA com o Phone Mockup --- */}
      <div className="hero-visuals"> {/* Este container agora centraliza o phone */}
        {/* <<< CÓDIGO DO PHONE MOCKUP COLADO AQUI >>> */}
        <div className="phone-container">
          <div className="phone-frame">
            <div className="phone-top">
              <div className="phone-speaker"></div>
              <div className="phone-camera"></div>
            </div>
            <div className="phone-screen">
              <div className="chat-content">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message-wrapper ${msg.type.startsWith('user') ? 'user-wrapper' : 'bot-wrapper'}`}>
                    <div className={`chat-message ${msg.type}`}>
                      {msg.type === 'bot-structured' ? (
                         <StructuredMessage data={msg.data} />
                      ) : (
                         <span className="message-text">{msg.text}</span>
                      )}
                      <div className="message-meta">
                        <span className="message-time">{msg.timestamp}</span>
                        {msg.type === 'user' && msg.status === 'read' && (<CheckOutlined className="message-status read" />)}
                        {msg.type === 'user' && msg.status === 'delivered' && (<CheckOutlined className="message-status delivered" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <<< FIM CÓDIGO PHONE MOCKUP >>> */}
      </div>
      {/* --- FIM HERO VISUALS --- */}
    </section>
  );
};

export default HeroSection;