// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Card, Spin, message } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import './LoginPage.css'; // Estilos específicos

const { Title, Text } = Typography;
const logoUrl = "https://i.imgur.com/DVNkfll.png"; // Reutiliza a logo

// --- Configuração da API ---
// Certifique-se que esta URL aponta para o seu backend
const API_URL = 'https://smart-api.ftslwl.easypanel.host';
// --------------------------

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Função para lidar com a submissão do formulário
  const onFinish = async (values) => {
    setLoading(true);
    console.log('Tentativa de Login com:', values);

    // --- CHAMADA REAL À API DE BACKEND ---
    try {
      // Monta o payload esperado pela API de login
      const payload = {
        identifier: values.email, // O backend espera 'identifier' (pode ser email ou telefone)
        senha: values.password   // O backend espera 'senha'
      };

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Tenta parsear a resposta, mesmo se for erro, pois pode conter uma mensagem
      let data;
      try {
         data = await response.json();
      } catch (parseError) {
         console.error("Erro ao parsear JSON da resposta:", parseError, response.status);
         // Se não conseguiu parsear e o status não é OK, mostra erro genérico
         if (!response.ok) {
            message.error(`Erro no servidor (Status: ${response.status}). Tente novamente.`);
            setLoading(false);
            return;
         }
         // Se status era OK mas não parseou, algo muito estranho aconteceu
         data = { error: "Resposta inválida do servidor." }; // Define um erro padrão
      }


      // Verifica se a requisição foi bem-sucedida (status 2xx)
      if (response.ok) {
        if (data.token) {
          message.success(data.message || 'Login realizado com sucesso!');

          // <<< ARMAZENA O TOKEN NO localStorage >>>
          localStorage.setItem('authToken', data.token);

          // Opcional: Armazenar informações básicas do usuário se precisar
          if (data.user) {
             localStorage.setItem('authUser', JSON.stringify(data.user));
          }

          // <<< REDIRECIONA PARA O DASHBOARD >>>
          navigate('/dashboard');

          // Não precisa setLoading(false) aqui, pois a navegação desmontará o componente
        } else {
           // Caso a API retorne 200 OK mas sem o token (erro inesperado)
           console.error("Login bem-sucedido na API, mas nenhum token recebido:", data);
           message.error('Falha no login: Resposta inesperada do servidor.');
           setLoading(false);
        }
      } else {
        // Se a API retornou um erro (status 4xx, 5xx)
        const errorMessage = data.error || 'E-mail ou senha inválidos.'; // Usa a msg da API ou padrão
        message.error(errorMessage);
        setLoading(false);
      }

    } catch (error) {
      // Erro de rede ou na própria requisição fetch
      console.error('Erro na requisição de login:', error);
      message.error('Não foi possível conectar ao servidor. Verifique sua conexão.');
      setLoading(false);
    }
    // --- FIM CHAMADA À API ---
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação do login:', errorInfo);
    // O Ant Design já mostra os erros de validação nos campos
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
            onFinish={onFinish} // Chama a função com a lógica da API
            onFinishFailed={onFinishFailed}
            layout="vertical"
            requiredMark={false}
            className="login-antd-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email" // Mantém 'email' no form, mas envia como 'identifier'
              label="E-mail ou Telefone" // Atualiza label para refletir backend
              rules={[
                { required: true, message: 'Por favor, insira seu e-mail ou telefone!' },
                // Removido a validação de formato de email, já que pode ser telefone
                // { type: 'email', message: 'Formato de e-mail inválido!' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="seuemail@exemplo.com ou 55119..."
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password" // Mantém 'password' no form, mas envia como 'senha'
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
                 {/* A funcionalidade "Lembrar-me" geralmente envolve tokens de longa duração ou refresh tokens,
                     o que está fora do escopo básico de armazenamento do token JWT de sessão.
                     Por enquanto, isso é apenas visual. */}
              </Form.Item>
              {/* Link de "Esqueci minha senha" (opcional) */}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
                size="large"
                block
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