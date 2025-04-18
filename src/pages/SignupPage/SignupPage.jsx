// src/pages/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd'; // Import message para feedback
import { WhatsAppOutlined, MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../../componentsLP/Header/Header'; // Importa o Header da Landing Page
import FooterLP from '../../componentsLP/Footer/Footer'; // Importa o Footer da Landing Page
import './SignupPage.css'; // Estilos específicos

const { Title, Paragraph } = Typography;

const SignupPage = () => {
  const [form] = Form.useForm(); // Hook para interagir com o formulário AntD
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  // Função chamada ao submeter o formulário com sucesso
  const onFinish = async (values) => {
    setLoading(true); // Ativa o estado de carregamento
    console.log('Dados recebidos:', values);
    // --- SIMULAÇÃO DE ENVIO PARA API ---
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay da rede
    // -----------------------------------

    // Exemplo: Resetar formulário e mostrar mensagem de sucesso
    message.success('Cadastro iniciado! Verifique seu WhatsApp e E-mail.');
    form.resetFields(); // Limpa os campos do formulário
    setLoading(false); // Desativa o carregamento

    // Aqui você adicionaria a lógica real:
    // 1. Enviar dados (values.whatsapp, values.email) para sua API backend.
    // 2. Sua API validaria e criaria o usuário (talvez enviando uma confirmação/link).
    // 3. Baseado na resposta da API, redirecionar o usuário ou mostrar mensagem de erro/sucesso.
    // Ex: if (apiResponse.success) { navigate('/dashboard'); } else { message.error(apiResponse.message); }
  };

  // Função chamada se a validação do formulário falhar
  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação:', errorInfo);
    message.error('Por favor, corrija os erros no formulário.');
  };

  return (
    <div className="signup-page-container">
      <Header />

      <main className="signup-content-wrapper">
        <div className="signup-form-container">
          <Title level={2} className="signup-title">Quase lá!</Title>
          <Paragraph className="signup-description">
            Informe seu WhatsApp e E-mail para criar sua conta e iniciar seus 7 dias de teste gratuito no Saldo Zap.
          </Paragraph>

          <Form
            form={form} // Associa o hook do formulário
            name="signup"
            onFinish={onFinish} // Chama onFinish em caso de sucesso na validação
            onFinishFailed={onFinishFailed} // Chama onFinishFailed em caso de erro na validação
            layout="vertical" // Labels acima dos inputs
            requiredMark={false} // Opcional: esconde marca de obrigatório (*)
            className="signup-antd-form"
          >
            {/* Campo WhatsApp */}
            <Form.Item
              name="whatsapp"
              label="Número do WhatsApp"
              rules={[
                { required: true, message: 'Por favor, insira seu número de WhatsApp!' },
                // Opcional: Adicionar regra de validação de formato (regex)
                // { pattern: /^\d{10,15}$/, message: 'Número inválido!' }
              ]}
              tooltip="Inclua o DDD. Ex: 11987654321" // Dica
            >
              <Input
                prefix={<WhatsAppOutlined className="site-form-item-icon" />}
                placeholder="Seu número com DDD"
                size="large"
                type="tel" // Ajuda teclados móveis
              />
            </Form.Item>

            {/* Campo E-mail */}
            <Form.Item
              name="email"
              label="Seu melhor E-mail"
              rules={[
                { required: true, message: 'Por favor, insira seu e-mail!' },
                { type: 'email', message: 'O e-mail inserido não é válido!' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="exemplo@email.com"
                size="large"
                type="email"
              />
            </Form.Item>

            {/* Botão de Submissão */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit" // Indica que este botão submete o formulário
                className="signup-submit-button"
                loading={loading} // Mostra ícone de carregamento se loading=true
                size="large"
                block // Faz o botão ocupar a largura toda
                icon={<ArrowRightOutlined />}
              >
                {loading ? 'Confirmando...' : 'Confirmar Cadastro e Iniciar'}
              </Button>
            </Form.Item>
          </Form>
          <Paragraph className="signup-terms-info">
              Ao continuar, você concorda com nossos <a href="/termos" target="_blank">Termos de Uso</a> e <a href="/privacidade" target="_blank">Política de Privacidade</a>.
          </Paragraph>
        </div>
      </main>

       {/* Footer simples */}
        <FooterLP />
    </div>
  );
};

export default SignupPage;