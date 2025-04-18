// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Card, Spin, message } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import './LoginPage.css'; // Estilos específicos

const { Title, Text } = Typography;
const logoUrl = "https://i.imgur.com/DVNkfll.png"; // Reutiliza a logo

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Função para lidar com a submissão do formulário
  const onFinish = async (values) => {
    setLoading(true);
    console.log('Tentativa de Login com:', values);

    // --- SIMULAÇÃO DE AUTENTICAÇÃO ---
    // Substitua isso pela chamada real à sua API de backend
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay

    // Simula verificação (substitua pela lógica real)
    const isValidUser = values.email === "admin@smartcusto.com" && values.password === "password"; // EXEMPLO - NÃO USE EM PRODUÇÃO

    if (isValidUser) {
      message.success('Login realizado com sucesso!');
      // Aqui você normalmente armazenaria um token (localStorage, Context API, etc.)
      // Ex: localStorage.setItem('authToken', 'seu_token_jwt');
      navigate('/dashboard'); // Redireciona para o dashboard após login
    } else {
      message.error('E-mail ou senha inválidos.');
      setLoading(false);
    }
    // --- FIM SIMULAÇÃO ---

    // setLoading(false); // O setLoading para em caso de erro ou após redirecionamento
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação do login:', errorInfo);
  };

  return (
    <div className="login-page-container">
      <Card className="login-form-card">
        <div className="login-header">
          <img src={logoUrl} alt="Smart-Custo Logo" className="login-logo" />
          <Title level={3} className="login-title">Acesso ao Painel</Title>
          <Text type="secondary">Faça login para gerenciar o Saldo Zap.</Text>
        </div>

        <Spin spinning={loading} tip="Autenticando...">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            requiredMark={false}
            className="login-antd-form"
            initialValues={{ remember: true }} // Lembrar-me marcado por padrão
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: 'Por favor, insira seu e-mail!' },
                { type: 'email', message: 'Formato de e-mail inválido!' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="seuemail@exemplo.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Sua Senha"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembrar-me</Checkbox>
              </Form.Item>
              {/* Link de "Esqueci minha senha" (opcional, comentado por enquanto) */}
              {/* <a className="login-form-forgot" href="/reset-password">
                Esqueci minha senha
              </a> */}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                size="large"
                block // Ocupa largura total
                icon={<LoginOutlined />}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default LoginPage;   