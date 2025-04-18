// src/componentsLP/PhoneMockupSection.jsx
import React from 'react';
import './PhoneMockupSection.css';
import { WhatsAppOutlined, CheckOutlined } from '@ant-design/icons'; // Ícone do WhatsApp e Check

// Dados simulados da conversa (pode ser mais complexo)
const chatMessages = [
  {
    type: 'bot-structured', // Tipo especial para mensagem estruturada
    data: {
      title: "Registro de Transação Concluído:",
      details: [
        { icon: '📝', label: 'Descrição', value: 'Salário' },
        { icon: '💰', label: 'Valor', value: 'R$ 1.000,00' },
        { icon: '📊', label: 'Tipo', value: 'Receita' },
        { icon: '🏦', label: 'Conta', value: 'Sicoob' }, // Exemplo
        { icon: '📅', label: 'Data', value: '11/09/2024' },
      ]
    },
    timestamp: '11:50'
  },
  {
    type: 'user',
    text: 'Paguei 12000 reais Televisão crédito Santander em 12x',
    timestamp: '11:50',
    status: 'read' // 'sent', 'delivered', 'read'
  },
  {
    type: 'bot',
    text: 'Ok, processando isso agora... ⏳',
    timestamp: '11:50'
  },
  {
    type: 'bot-structured',
    data: {
        title: "Detalhes da Transação Registrada:",
        details: [
          { icon: '📺', label: 'Descrição', value: 'Televisão' },
          { icon: '💰', label: 'Valor', value: 'R$ 12.000,00 em 12x' },
          { icon: '💸', label: 'Tipo', value: 'Despesa' },
          { icon: '💳', label: 'Cartão', value: 'Santander' },
          { icon: '📅', label: 'Data', value: '17/09/2024' },
        ]
      },
    timestamp: '11:50'
  },
   {
    type: 'user',
    text: 'Recebi 1412 reais Salário na conta Santander',
    timestamp: '11:50',
    status: 'read'
  },
    {
    type: 'bot',
    text: 'Recebido com sucesso, estou processando. 🎉',
    timestamp: '11:50'
  },
  // Adicione mais mensagens se desejar
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


const PhoneMockupSection = () => {
  // --- Para Vídeo (Descomente e ajuste se usar vídeo) ---
  // const videoEmbedUrl = "https://www.youtube.com/embed/SEU_VIDEO_ID";
  // const showVideo = false; // Mude para true para mostrar o vídeo em vez do chat

  return (
    <section className="phone-mockup-section">
      <div className="phone-container"> {/* Container para posicionar o telefone */}
        <div className="phone-frame"> {/* A moldura do celular */}
          <div className="phone-top"> {/* Notch/Barra superior */}
            <div className="phone-speaker"></div>
            <div className="phone-camera"></div>
          </div>
          <div className="phone-screen"> {/* A tela onde o conteúdo aparece */}
             {/* --- Opção 1: Chat Simulado (Padrão) --- */}
             {/* {!showVideo && ( */}
              <div className="chat-content">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message-wrapper ${msg.type.startsWith('user') ? 'user-wrapper' : 'bot-wrapper'}`}>
                     {/* Placeholder da foto do perfil (opcional para o bot) */}
                     {/* {msg.type.startsWith('bot') && <img src="URL_FOTO_BOT" alt="Bot" className="profile-pic bot-pic"/>} */}

                    <div className={`chat-message ${msg.type}`}>
                       {/* Renderiza conteúdo estruturado ou texto normal */}
                      {msg.type === 'bot-structured' ? (
                         <StructuredMessage data={msg.data} />
                      ) : (
                         <span className="message-text">{msg.text}</span>
                      )}
                       {/* Timestamp e Status */}
                      <div className="message-meta">
                        <span className="message-time">{msg.timestamp}</span>
                        {msg.type === 'user' && msg.status === 'read' && (
                          <CheckOutlined className="message-status read" />
                        )}
                         {msg.type === 'user' && msg.status === 'delivered' && (
                          <CheckOutlined className="message-status delivered" />
                        )}
                      </div>
                    </div>
                     {/* Placeholder da foto do perfil (opcional para o usuário) */}
                      {/* {msg.type.startsWith('user') && <img src="URL_FOTO_USER" alt="User" className="profile-pic user-pic"/>} */}
                  </div>
                ))}
              </div>
             {/* )} */}


            {/* --- Opção 2: Vídeo Embedado (Descomente para usar) --- */}
            {/* {showVideo && (
              <iframe
                className="embedded-video-iframe-mockup"
                src={videoEmbedUrl}
                title="Demonstração Smart-Custo no Celular"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )} */}
             {/* --- Fim Opção Vídeo --- */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneMockupSection;