// src/pages/UserActivationPage/UserActivationPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <<< ADICIONADO Link à importação
import { Form, Input, Button, Typography, Card, Spin, message } from 'antd';
import { WhatsAppOutlined, MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../../componentsLP/Header/Header';     // Reutiliza Header da LP
import FooterLP from '../../componentsLP/Footer/Footer'; // Reutiliza Footer da LP
import './UserActivationPage.css';                // Estilos específicos

const { Title, Paragraph } = Typography;
const logoUrl = "https://i.imgur.com/DVNkfll.png"; // Logo

const UserActivationPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Função chamada ao submeter o formulário com sucesso
  const onFinish = async (values) => {
    setLoading(true);
    console.log('Tentativa de Login/Acesso via Ativação:', values);

    // --- SIMULAÇÃO DE VALIDAÇÃO/LOGIN NO BACKEND ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Lógica real aqui...

    // Simulando um usuário existente com esses dados
    const userExists = values.email === "usuario@exemplo.com" && values.whatsappNumber === "11987654321"; // EXEMPLO

    if (userExists) {
      message.success('Acesso confirmado! Redirecionando...');
      // Navega para a página da conta, passando os dados (simulados ou da API)
      navigate('/conta', {
        replace: true,
        state: {
          email: values.email,
          whatsappNumber: values.whatsappNumber,
          name: 'Usuário Exemplo',
          plan: 'Plano Anual',
          expiry: '2025-10-20',
          daysLeft: null,
        }
      });
      // setLoading(false); // Não precisa

    } else {
      message.error('Nenhuma conta encontrada com este E-mail e WhatsApp. Verifique os dados ou cadastre-se.');
      setLoading(false);
    }
    // --- FIM SIMULAÇÃO ---
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação do acesso:', errorInfo);
    message.error('Por favor, preencha os campos corretamente.');
  };

  return (
    <div className="user-activation-page-container">
      {/* Verifica Header */}
      {typeof Header === 'function' ? <Header /> : null}

      <main className="user-activation-main-content">
        <Card className="activation-form-card">
          <div className="activation-header">
            <img src={logoUrl} alt="Smart-Custo Logo" className="activation-logo" />
            <Title level={3} className="activation-title">Acessar Minha Conta</Title>
            <Paragraph className="activation-description">
              Informe seu e-mail e WhatsApp cadastrados para visualizar os detalhes da sua conta Smart-Custo.
            </Paragraph>
          </div>

          <Spin spinning={loading} tip="Verificando...">
            <Form
              form={form}
              name="user_access"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              requiredMark={false}
              className="activation-antd-form"
            >
              <Form.Item
                name="email"
                label="Seu E-mail Cadastrado"
                rules={[ { required: true, message: 'Por favor, insira seu e-mail!' }, { type: 'email', message: 'Formato de e-mail inválido!' }, ]}
                tooltip="O e-mail associado à sua conta Smart-Custo."
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="exemplo@email.com" size="large" type="email" />
              </Form.Item>

              <Form.Item
                name="whatsappNumber"
                label="Seu Número do WhatsApp"
                rules={[ { required: true, message: 'Informe o WhatsApp cadastrado!' }, { pattern: /^(?:[1-9]{2})?(?:[2-9]|9[1-9])[0-9]{3,4}[0-9]{4}$/, message: 'Número inválido! Use apenas números com DDD.' } ]}
                tooltip="Este será o número habilitado para interagir com o Smart-Custo."
              >
                <Input prefix={<WhatsAppOutlined className="site-form-item-icon" />} placeholder="Seu número com DDD (ex: 119...)" size="large" type="tel" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="activation-submit-button" loading={loading} size="large" block icon={<ArrowRightOutlined />}>
                  {loading ? 'Verificando...' : 'Acessar Conta'}
                </Button>
              </Form.Item>

              {/* Link para cadastro (agora Link está definido) */}
              <Paragraph style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9em' }}>
                Não tem uma conta?{' '}
                <Link to="/signup" style={{ color: '#adedb1', fontWeight: '500' }}>
                   Comece seu teste gratuito!
                </Link>
              </Paragraph>
            </Form>
          </Spin>
        </Card>
      </main>

       {/* Verifica FooterLP */}
      {typeof FooterLP === 'function' ? <FooterLP /> : null}
    </div>
  );
};

export default UserActivationPage;