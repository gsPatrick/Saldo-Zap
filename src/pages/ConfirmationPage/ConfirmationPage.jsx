// src/pages/ConfirmationPage/ConfirmationPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result, Typography, Spin, Card, Alert } from 'antd'; // Adicionado Card e Alert
import { WhatsAppOutlined, CheckCircleFilled, RobotOutlined, InfoCircleOutlined } from '@ant-design/icons'; // Adicionado RobotOutlined e InfoCircleOutlined
import Header from '../../componentsLP/Header/Header';
import FooterLP from '../../componentsLP/Footer/Footer';
import './ConfirmationPage.css';

const { Title, Paragraph, Text } = Typography;

// Placeholder para o gráfico/visual do bot
const BotVisualPlaceholder = () => (
    <div className="bot-visual-placeholder">
        <RobotOutlined />
        {/* Pode adicionar SVGs mais complexos aqui depois */}
        <div className="bot-visual-dots">
            <span></span><span></span><span></span>
        </div>
        <Text type="secondary" style={{ marginTop: '8px', fontSize: '0.9em'}}>IA Pronta para Ajudar!</Text>
    </div>
);


const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);

  const botWhatsAppNumber = "558694879052";
  const initialMessage = encodeURIComponent("Olá! Quero começar a usar o Saldo Zap.");
  const botWhatsAppLink = `https://wa.me/${botWhatsAppNumber}?text=${initialMessage}`;

  useEffect(() => {
    if (location.state) {
      setPageData({
        planName: location.state.planName || 'Saldo Zap',
      });
    } else {
      console.warn("Página de confirmação acessada sem dados de estado.");
      setPageData({ planName: 'Saldo Zap' });
    }
  }, [location.state, navigate]);

  if (!pageData) {
    return (
      <div className="confirmation-page-container loading">
         {typeof Header === 'function' ? <Header /> : null}
         <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <Spin size="large" />
         </div>
         {typeof FooterLP === 'function' ? <FooterLP /> : null}
      </div>
    );
  }

  return (
    <div className="confirmation-page-container">
      {typeof Header === 'function' ? <Header /> : null}

      <main className="confirmation-main-content">
         {/* Container para o conteúdo central */}
         <div className="confirmation-content-card">
            {/* Visual do Bot */}
            <BotVisualPlaceholder />

            {/* Componente Result para o Sucesso */}
            <Result
              className="confirmation-result-inner" // Classe interna para evitar conflito de padding
              icon={<CheckCircleFilled />}
              status="success"
              title={`Parabéns! Acesso ao ${pageData.planName} Liberado!`}
              subTitle="Tudo pronto para você começar a organizar suas finanças. Clique no botão abaixo para iniciar sua primeira conversa com nosso assistente no WhatsApp."
              extra={[
                <Button
                  type="primary"
                  key="whatsapp-button"
                  icon={<WhatsAppOutlined />}
                  size="large"
                  href={botWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="confirmation-cta-button"
                >
                  Conversar com Saldo Zap no WhatsApp
                </Button>,
                 <Paragraph key="save-number" className="save-contact-info">
                    Salve nosso número: <strong className="whatsapp-number-display">({botWhatsAppNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')})</strong>
                 </Paragraph>,
              ]}
            />

            {/* Aviso de Segurança */}
             <Alert
                message="Aviso Importante"
                description="Para sua segurança, nunca compartilhe senhas, dados completos de cartão de crédito ou outras informações altamente sensíveis diretamente no chat."
                type="warning"
                showIcon
                icon={<InfoCircleOutlined />}
                className="security-alert-message"
            />
         </div>
      </main>

      {typeof FooterLP === 'function' ? <FooterLP /> : null}
    </div>
  );
};

export default ConfirmationPage;