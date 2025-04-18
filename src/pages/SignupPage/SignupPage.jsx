// src/pages/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
// --- Importar useNavigate ---
import { useNavigate } from 'react-router-dom';
// --------------------------
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { WhatsAppOutlined, MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../../componentsLP/Header/Header';
import FooterLP from '../../componentsLP/Footer/Footer';
import './SignupPage.css';

const { Title, Paragraph } = Typography;

// Definir URL da API (Idealmente de variável de ambiente)
const API_URL =  'https://smart-api.ftslwl.easypanel.host';

const SignupPage = () => {
  // --- Obter a função navigate ---
  const navigate = useNavigate();
  // -----------------------------
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log('Dados para enviar:', values);

    try {
      console.log('Tentando chamar a API...'); // Log de início da chamada

      const response = await fetch(`${API_URL}/api/v1/auth/website-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros headers como 'X-API-Key' se sua rota for protegida
        },
        body: JSON.stringify({
          telefone: values.whatsapp, // Mapeia campo do form para 'telefone' da API
          email: values.email        // Mapeia campo do form para 'email' da API
        }),
      });

      console.log('Resposta da API recebida. Status:', response.status); // Log do status

      if (response.ok) { // Status 2xx (200 ou 201)
        const data = await response.json();
        console.log('API Response OK:', data);
        message.success('Cadastro realizado com sucesso! Redirecionando...'); // Feedback para o usuário
        form.resetFields(); // Limpa o formulário

        // --- Redirecionamento após sucesso ---
        // Adiciona um pequeno delay (1 segundo) para o usuário ver a mensagem
        setTimeout(() => {
           navigate('/confirmacao'); // <<< Usa navigate para redirecionar
        }, 1000);
        // ----------------------------------

      } else { // Erros da API (4xx, 5xx)
        // Tenta pegar a mensagem de erro do corpo da resposta JSON
        const errorData = await response.json().catch(() => ({ error: `Erro ${response.status}: Não foi possível processar a resposta da API.` }));
        console.error('API Response Error:', response.status, errorData);
        // Mostra a mensagem de erro da API ou uma mensagem padrão
        message.error(errorData.error || `Falha no cadastro (${response.status}). Tente novamente.`);
      }

    } catch (error) { // Erros de rede ou falha na comunicação
      console.error('Erro na chamada da API (fetch catch):', error);
      message.error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    } finally {
      // Garante que o estado de loading seja desativado, mesmo se der erro ou redirecionar
      // Se redirecionar imediatamente, o setLoading(false) pode não ser necessário visualmente,
      // mas é bom mantê-lo por consistência caso o redirecionamento falhe ou seja removido.
      console.log('Finalizando onFinish, setLoading(false)');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação do formulário AntD:', errorInfo);
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
            form={form}
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            requiredMark={false}
            className="signup-antd-form"
          >
            <Form.Item
              name="whatsapp"
              label="Número do WhatsApp"
              rules={[
                { required: true, message: 'Por favor, insira seu número de WhatsApp!' },
              ]}
              tooltip="Inclua o DDD. Ex: 11987654321"
            >
              <Input
                prefix={<WhatsAppOutlined className="site-form-item-icon" />}
                placeholder="Seu número com DDD"
                size="large"
                type="tel"
              />
            </Form.Item>

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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-submit-button"
                loading={loading}
                size="large"
                block
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
      <FooterLP />
    </div>
  );
};

export default SignupPage;