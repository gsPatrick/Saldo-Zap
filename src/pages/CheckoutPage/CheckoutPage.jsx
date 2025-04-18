// src/pages/CheckoutPage/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para pegar plano da URL e navegar
import { Form, Input, Button, Radio, Typography, Card, Row, Col, Divider, message, Spin, Steps } from 'antd';
import { CreditCardOutlined, QrcodeOutlined, BarcodeOutlined, LockOutlined, UserOutlined, MailOutlined, ArrowLeftOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Header from '../../componentsLP/Header/Header'; // <<< VERIFQUE ESTE CAMINHO
import FooterLP from '../../componentsLP/Footer/Footer'; // <<< VERIFQUE ESTE CAMINHO
import './CheckoutPage.css';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

// --- NOVOS DADOS DOS PLANOS ---
// Atualizado para refletir os planos Mensal e Anual
const planData = {
  mensal: { name: 'Saldo Zap Mensal', price: 21.90, cycle: 'mês' },
  anual: { name: 'Saldo Zap Anual', price: 180.00, cycle: 'ano' },
  // Mantenha IDs 'basic' e 'premium' se as rotas antigas ainda puderem ser acessadas,
  // ou remova-os se as rotas /checkout/basic e /checkout/premium não existem mais.
  // Para este exemplo, vamos assumir que apenas 'mensal' e 'anual' são válidos.
};
// --- FIM NOVOS DADOS DOS PLANOS ---

// Simulação de dados Pix (mantido igual, mas pode ser ajustado se necessário)
const fakePixData = {
  qrCodeValue: "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-1234-abcdef123456520400005303986540529.905802BR5913Nome Vendedor6009SAO PAULO62070503***6304ABCD",
  copyPasteCode: "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-1234-abcdef123456520400005303986540529.905802BR5913Nome Vendedor6009SAO PAULO62070503***6304ABCD"
};

// Simulação de link de Boleto (mantido igual)
const fakeBoletoLink = "https://www.exemplo.com/boleto/123456789";
const fakeBoletoBarcode = "12345.67890 12345.678901 12345.678902 1 98760000029900";


const CheckoutPage = () => {
  const { planId } = useParams(); // Pega 'mensal' ou 'anual' da URL
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // Padrão Cartão
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Define o plano baseado na URL ao carregar a página (usando os novos IDs)
    if (planId && planData[planId]) {
      setSelectedPlan(planData[planId]);
    } else {
      // Se o planId da URL não for 'mensal' nem 'anual' (ou não existir)
      message.error('Plano inválido ou não selecionado.');
      navigate('/planos'); // Redireciona para a página de planos
    }
  }, [planId, navigate]); // A dependência é apenas o planId e navigate

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Função para avançar o step ao começar a digitar dados do pagador
  const handleFormValuesChange = (changedValues, allValues) => {
    if (currentStep === 0) {
      const payerInfoStarted = allValues.payerName || allValues.payerEmail || allValues.whatsappNumber;
      if (payerInfoStarted) {
        setCurrentStep(1);
      }
    }
  };

  // Função para lidar com a submissão final (navega para AwaitingPayment)
  const handleFinishCheckout = async (values) => {
    setLoading(true);
    if(currentStep < 1) setCurrentStep(1); // Garante step 1 visualmente

    console.log('Dados do Checkout (Form Values):', values);
    console.log('Plano Selecionado:', selectedPlan);
    console.log('Método de Pagamento:', paymentMethod);

    // --- SIMULAÇÃO: CHAMADA INICIAL API/GATEWAY ---
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera
    const isInitialStepSuccess = true; // Assume sucesso na geração dos dados

    if (isInitialStepSuccess) {
      // Navega para a página de aguardar pagamento, passando os dados
      navigate('/awaiting-payment', {
        replace: true,
        state: {
          method: paymentMethod,
          planName: selectedPlan?.name, // Usa o nome do plano selecionado
          amount: selectedPlan?.price, // Usa o preço do plano selecionado
          pixData: paymentMethod === 'pix' ? fakePixData : null,
          boletoLink: paymentMethod === 'boleto' ? fakeBoletoLink : null,
          boletoBarcode: paymentMethod === 'boleto' ? fakeBoletoBarcode : null,
          // Passa também o whatsappNumber, pode ser útil
          whatsappNumber: values.whatsappNumber
        }
      });
      // Não para o loading aqui, pois a próxima página pode ter seu próprio loading
    } else {
      message.error('Houve um erro ao iniciar o processo de pagamento. Tente novamente.');
      setCurrentStep(0);
      setLoading(false);
    }
    // --- FIM SIMULAÇÃO ---
  };

  // Função para falha na validação do formulário AntD
  const onFinishFailed = (errorInfo) => {
    console.log('Falha na validação do formulário:', errorInfo);
    message.warning('Por favor, preencha todos os campos obrigatórios.');
     if (currentStep === 0 && (form.getFieldValue('payerName') || form.getFieldValue('payerEmail') || form.getFieldValue('whatsappNumber'))) {
         setCurrentStep(1);
     }
  };

  // --- Funções de Renderização (renderCardFields, renderPixBoletoInfo) ---
  // Nenhuma mudança necessária aqui
  const renderCardFields = () => (
    <>
      <Form.Item name="cardName" label="Nome no Cartão" rules={[{ required: true, message: 'Insira o nome como está no cartão!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Nome Completo" size="large" />
      </Form.Item>
      <Form.Item name="cardNumber" label="Número do Cartão" rules={[{ required: true, message: 'Insira o número do cartão!' }]}>
        <Input prefix={<CreditCardOutlined />} placeholder="0000 0000 0000 0000" size="large" />
      </Form.Item>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item name="expiry" label="Validade (MM/AA)" rules={[{ required: true, message: 'Insira a validade!' }]}>
            <Input placeholder="MM/AA" size="large" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="cvc" label="CVC" rules={[{ required: true, message: 'Insira o CVC!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Código" size="large" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const renderPixBoletoInfo = () => (
    <div className="payment-instructions">
      <Paragraph>
        {paymentMethod === 'pix' ? 'Após confirmar, um QR Code e código Pix serão gerados.' : 'Após confirmar, o boleto será gerado.'}
      </Paragraph>
      <Paragraph strong>A liberação ocorrerá após confirmação do pagamento.</Paragraph>
    </div>
  );
  // --- Fim Funções de Renderização ---

  // Renderiza loading se o plano ainda não foi carregado
  if (!selectedPlan) {
    return (
        <div className="checkout-page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             {typeof Header === 'function' ? <Header /> : null}
            <Spin size="large" />
        </div>
    );
  }

  // --- Renderização Principal da Página ---
  return (
    <div className="checkout-page-container">
      {typeof Header === 'function' ? <Header /> : null}

      <main className="checkout-content-wrapper">
        {/* O Form único envolve toda a estrutura */}
        <Form
          form={form}
          name="checkout_form"
          onFinish={handleFinishCheckout}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleFormValuesChange}
          layout="vertical"
          requiredMark={false}
          className="checkout-form-container"
        >
          <Spin spinning={loading} tip="Processando..." size="large">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/planos')} className="checkout-back-button" style={{ marginBottom: '20px' }}>
              Voltar aos Planos
            </Button>

            <Title level={2} className="checkout-title">Finalizar Compra</Title>
            <Steps current={currentStep} className="checkout-steps">
              <Step title="Confirmação" description="Revise seu pedido." />
              <Step title="Pagamento" description="Insira os dados." />
              <Step title="Concluído" description="Acesso liberado!" />
            </Steps>

            <Row gutter={[32, 32]}>
              {/* Coluna Esquerda */}
              <Col xs={24} md={12}>
                <Card title="Resumo do Pedido" bordered={false} className="checkout-card">
                  <div className="order-summary">
                    {/* Exibe os dados do plano selecionado (Mensal ou Anual) */}
                    <Text strong>Plano Escolhido:</Text>
                    <Text className="plan-name-summary">{selectedPlan.name}</Text>
                    <Divider style={{ margin: '12px 0' }}/>
                    <div className="price-line">
                      <Text>Valor:</Text>
                      <Text strong className="price-value">R$ {selectedPlan.price.toFixed(2).replace('.', ',')}</Text>
                    </div>
                    <div className="price-line">
                      <Text>Ciclo:</Text>
                      <Text>{selectedPlan.cycle}</Text>
                    </div>
                    <Divider style={{ margin: '12px 0' }}/>
                    <div className="price-line total">
                      <Text strong>Total:</Text>
                      <Text strong className="price-value total-value">R$ {selectedPlan.price.toFixed(2).replace('.', ',')}</Text>
                    </div>
                  </div>
                </Card>

                <Card title="Informações do Pagador" bordered={false} className="checkout-card">
                  {/* Campos do Pagador */}
                  <Form.Item name="payerName" label="Nome Completo" rules={[{ required: true, message: 'Insira seu nome completo!' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Seu nome" size="large" />
                  </Form.Item>
                  <Form.Item name="payerEmail" label="E-mail (para acesso e comunicação)" rules={[{ required: true, message: 'Insira seu e-mail!' }, { type: 'email', message: 'E-mail inválido!' }]}>
                    <Input prefix={<MailOutlined />} placeholder="seu@email.com" size="large" type="email" />
                  </Form.Item>
                  <Form.Item name="whatsappNumber" label="WhatsApp para Ativação do Sistema" rules={[{ required: true, message: 'Informe o WhatsApp onde usará o Saldo Zap!' }, { pattern: /^(?:[1-9]{2})?(?:[2-9]|9[1-9])[0-9]{3,4}[0-9]{4}$/, message: 'Número inválido! Use apenas números com DDD.' }]} tooltip="Use o número principal onde deseja receber análises e registrar gastos.">
                    <Input prefix={<WhatsAppOutlined />} placeholder="Seu número com DDD (ex: 119...)" size="large" type="tel" />
                  </Form.Item>
                  {/* <Form.Item name="cpf" label="CPF" ... /> */}
                </Card>
              </Col>

              {/* Coluna Direita */}
              <Col xs={24} md={12}>
                <Card title="Método de Pagamento" bordered={false} className="checkout-card">
                  {/* Seleção do Método */}
                  <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod} style={{ width: '100%' }}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}><Radio value="card" className="payment-method-radio"><CreditCardOutlined /> Cartão de Crédito</Radio></Col>
                      <Col span={24}><Radio value="pix" className="payment-method-radio"><QrcodeOutlined /> Pix</Radio></Col>
                      <Col span={24}><Radio value="boleto" className="payment-method-radio"><BarcodeOutlined /> Boleto Bancário</Radio></Col>
                    </Row>
                  </Radio.Group>
                </Card>

                <Card title="Detalhes do Pagamento" bordered={false} className="checkout-card payment-details-card">
                  {/* Campos Condicionais */}
                  {paymentMethod === 'card' && renderCardFields()}
                  {(paymentMethod === 'pix' || paymentMethod === 'boleto') && renderPixBoletoInfo()}

                  {/* Botão Finalizar */}
                  <Form.Item style={{ marginTop: '24px', marginBottom: '8px' }}>
                    <Button type="primary" htmlType="submit" className="checkout-submit-button" loading={loading} size="large" block icon={<LockOutlined />}>
                      {loading ? 'Processando...' : `Finalizar Compra com ${paymentMethod === 'card' ? 'Cartão' : paymentMethod === 'pix' ? 'Pix' : 'Boleto'}`}
                    </Button>
                  </Form.Item>
                  <Paragraph className="secure-payment-info">
                    <LockOutlined /> Pagamento seguro processado via [Nome do Gateway].
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Spin>
        </Form> {/* Fechamento do Form único */}
      </main>

      {/* Renderiza Footer */}
      {typeof FooterLP === 'function' ? <FooterLP /> : null}
    </div>
  );
};

export default CheckoutPage;