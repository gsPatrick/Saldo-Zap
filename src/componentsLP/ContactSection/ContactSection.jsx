// src/componentsLP/ContactSection.jsx
import React from 'react';
import './ContactSection.css';
import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';

const ContactSection = () => {
  // Substitua pelo seu número de WhatsApp no formato internacional sem '+' ou espaços
  const whatsappNumber = "55119XXXXXXXX"; // EXEMPLO: número de SP, Brasil
  const whatsappMessage = encodeURIComponent("Olá! Tenho uma dúvida sobre o Saldo Zap."); // Mensagem pré-definida (opcional)
  const whatsappLink = `https://wa.me/message/4JRK6ZQVE4REP1`;

  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2 className="contact-title">
          Tem Dúvidas? <br /> Fale Conosco!
        </h2>
        <p className="contact-description">
          Entre em contato diretamente pelo nosso WhatsApp. Nossa equipe está pronta para te ajudar com qualquer questão sobre o Saldo Zap.
        </p>
        <Button
          type="primary"
          size="large"
          className="contact-cta-button"
          icon={<WhatsAppOutlined />}
          href={whatsappLink} // Link direto para o WhatsApp
          target="_blank" // Abrir em nova aba/app
          rel="noopener noreferrer" // Boas práticas de segurança
        >
          Conversar no WhatsApp
        </Button>
      </div>

      {/* Visual inspirado na referência, mas com tema de chat */}
      <div className="contact-visual">
        <div className="visual-chat-window">
          <div className="chat-header">
             {/* Pode adicionar um ícone ou título simples */}
             <span>Suporte Saldo Zap</span>
          </div>
          <div className="chat-messages">
            <div className="chat-bubble bot">Olá! Bem vindo ao Saldo Zap como posso ajudar hoje? 😊</div>
            <div className="chat-bubble user">Tenho uma dúvida sobre os relatórios...</div>
             <div className="chat-bubble bot typing"><span>.</span><span>.</span><span>.</span></div> {/* Simula "digitando" */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
