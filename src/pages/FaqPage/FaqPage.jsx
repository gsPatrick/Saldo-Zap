// src/pages/FaqPage/FaqPage.jsx
import React from 'react';
// <<< ADICIONAR Button à importação do antd
import { Collapse, Typography, Space, Button } from 'antd';
import { SafetyCertificateOutlined, QuestionCircleOutlined, WhatsAppOutlined, ClockCircleOutlined, RobotOutlined, LockOutlined, AppstoreAddOutlined } from '@ant-design/icons'; // Importa ícones
import Header from '../../componentsLP/Header/Header';     // Reutiliza o Header da LP
import FooterLP from '../../componentsLP/Footer/Footer'; // Reutiliza o Footer da LP
import './FaqPage.css';                        // Estilos específicos da página

const { Title, Paragraph } = Typography; // Removido Text se não usado diretamente
const { Panel } = Collapse;

// --- Conteúdo do FAQ ---
const faqItems = [
  {
    key: '1',
    label: (
      <Space>
        <SafetyCertificateOutlined />
        <span>Meus dados financeiros estão seguros?</span>
      </Space>
    ),
    children: (
      <Paragraph>
        Sim, a segurança é nossa prioridade máxima. Utilizamos criptografia de ponta para proteger suas informações e seguimos rigorosas políticas de privacidade alinhadas com a LGPD. Seus dados são confidenciais e não são compartilhados. O acesso é protegido e monitorado.
      </Paragraph>
    ),
  },
  {
    key: '2',
    label: (
        <Space>
          <WhatsAppOutlined />
          <span>Como funciona o registro pelo WhatsApp?</span>
        </Space>
    ),
    children: (
      <Paragraph>
        É muito simples! Basta enviar uma mensagem para o nosso bot informando o gasto ou receita. Por exemplo: "Gastei R$ 30 no café" ou "Recebi R$ 500 de serviço". Você também pode enviar fotos de comprovantes ou mensagens de áudio para registro. Nossa IA interpreta e organiza tudo para você.
      </Paragraph>
    ),
  },
   {
    key: '3',
    label: (
        <Space>
          <RobotOutlined />
          <span>Como a Inteligência Artificial me ajuda?</span>
        </Space>
    ),
    children: (
      <Paragraph>
        Nossa IA aprende com seus hábitos financeiros. Ela categoriza seus gastos automaticamente (mesmo que você não especifique), identifica padrões, envia alertas de contas a pagar, e pode até oferecer recomendações personalizadas para te ajudar a economizar e otimizar seu orçamento.
      </Paragraph>
    ),
  },
   {
    key: '4',
    label: (
        <Space>
          <ClockCircleOutlined />
          <span>O que acontece depois dos 7 dias gratuitos?</span>
        </Space>
    ),
    children: (
      <Paragraph>
        Durante os 7 dias, você tem acesso completo a todas as funcionalidades Premium. Após esse período, para continuar usando os recursos avançados, você precisará escolher um dos nossos planos pagos (Basic ou Premium). Caso não assine, sua conta pode ter funcionalidades limitadas ou ficar inativa conforme nossos termos.
      </Paragraph>
    ),
  },
  {
    key: '5',
    label: (
        <Space>
           <AppstoreAddOutlined />
          <span>Preciso instalar algum aplicativo?</span>
        </Space>
    ),
    children: (
      <Paragraph>
        Não! Toda a interação acontece diretamente no seu WhatsApp. Não há necessidade de baixar ou instalar nenhum aplicativo adicional. Apenas adicione nosso número e comece a usar.
      </Paragraph>
    ),
  },
   {
    key: '6',
    label: (
        <Space>
           <LockOutlined />
          <span>Como posso cancelar minha assinatura?</span>
        </Space>
    ),
    children: (
      <Paragraph>
        Você pode cancelar sua assinatura a qualquer momento. O processo é simples e pode ser feito diretamente através do painel do usuário (se houver um link específico para o portal do cliente do gateway de pagamento) ou entrando em contato com nosso suporte via WhatsApp. Não há taxas de cancelamento.
      </Paragraph>
    ),
  },
];
// --- Fim Conteúdo FAQ ---


const FaqPage = () => {
  return (
    <div className="faq-page-container">
      {/* Verifica se Header foi importado corretamente */}
      {typeof Header === 'function' ? <Header /> : null}

      <main className="faq-main-content">
        <Title level={2} className="faq-page-title">Perguntas Frequentes</Title>
        <Paragraph className="faq-page-subtitle">
          Tem alguma dúvida sobre o Saldo Zap? Encontre as respostas aqui. Se precisar, fale conosco!
        </Paragraph>

        <Collapse
          accordion
          bordered={false}
          className="faq-collapse"
          expandIconPosition="end"
        >
           {faqItems.map(item => (
                <Panel header={item.label} key={item.key} className="faq-panel">
                  {item.children}
                </Panel>
            ))}
        </Collapse>

         <div className="faq-contact-prompt">
            <Paragraph>
                Não encontrou sua resposta?
            </Paragraph>
             {/* Button agora está definido e pode ser usado */}
            <Button type="primary" href="/contato" icon={<WhatsAppOutlined />}>
                Fale Conosco via WhatsApp
            </Button>
         </div>

      </main>

       {/* Verifica se FooterLP foi importado corretamente */}
      {typeof FooterLP === 'function' ? <FooterLP /> : null}
    </div>
  );
};

export default FaqPage;