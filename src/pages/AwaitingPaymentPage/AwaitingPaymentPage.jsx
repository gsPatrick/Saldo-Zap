// src/pages/AwaitingPaymentPage/AwaitingPaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin, Typography, Button, Card, message, Tooltip, Input } from 'antd'; // <<< INPUT ADICIONADO AQUI
import { LoadingOutlined, CheckCircleOutlined, CopyOutlined, ClockCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import FooterLP from '../../componentsLP/Footer/Footer'; // <<< VERIFIQUE ESTE CAMINHO

// import { QRCode } from 'qrcode.react'; // Mantido comentado por enquanto
import Header from '../../componentsLP/Header/Header'; // <<< VERIFIQUE ESTE CAMINHO
import './AwaitingPaymentPage.css';

const { Title, Paragraph, Text } = Typography;

// Simulação de dados Pix
const fakePixData = {
  qrCodeValue: "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-1234-abcdef123456520400005303986540529.905802BR5913Nome Vendedor6009SAO PAULO62070503***6304ABCD",
  copyPasteCode: "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-1234-abcdef123456520400005303986540529.905802BR5913Nome Vendedor6009SAO PAULO62070503***6304ABCD"
};
// Simulação de link de Boleto
const fakeBoletoLink = "https://www.exemplo.com/boleto/123456789";
const fakeBoletoBarcode = "12345.67890 12345.678901 12345.678902 1 98760000029900";

const AwaitingPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Inicializa paymentInfo como null explicitamente
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    // Verifica se location.state e location.state.method existem ANTES de prosseguir
    if (location.state?.method) { // Usando optional chaining aqui também por segurança
        const { method, planName, amount, pixData, boletoLink, boletoBarcode } = location.state;

        // Constrói o objeto de informações de forma segura
        const info = {
            method: method,
            planName: planName || 'Plano Selecionado',
            amount: amount || 0,
            // Atribui dados específicos apenas se o método corresponder, usando dados fakes como fallback
            pixData: method === 'pix' ? (pixData || fakePixData) : null,
            boletoLink: method === 'boleto' ? (boletoLink || fakeBoletoLink) : null,
            boletoBarcode: method === 'boleto' ? (boletoBarcode || fakeBoletoBarcode) : null,
        };

        console.log("Dados recebidos em AwaitingPayment:", info); // Log para depuração
        setPaymentInfo(info); // Define o estado com o objeto seguro

        // --- SIMULAÇÃO DE VERIFICAÇÃO DE STATUS (mantida igual) ---
        if (method !== 'card') {
            const timer = setTimeout(() => {
                const confirm = Math.random() > 0.3;
                if(confirm){
                    setStatus('confirmed');
                    message.success('Pagamento confirmado! Redirecionando...');
                    setTimeout(() => navigate('/dashboard'), 2500);
                } else {
                   // Simulação de expiração (opcional)
                   // setStatus('expired');
                   // message.warning('O tempo para pagamento expirou.');
                }
            }, 15000); // Simula espera de 15 segundos
            return () => clearTimeout(timer);
        } else {
             setStatus('confirmed');
             message.success('Pagamento com cartão confirmado! Redirecionando...');
             setTimeout(() => navigate('/dashboard'), 3000);
        }
        // --- FIM SIMULAÇÃO ---

    } else {
      // Se não encontrar dados essenciais, informa e redireciona
      console.error("Erro: location.state ou location.state.method não encontrado.");
      message.error('Informações de pagamento inválidas. Redirecionando...');
      // Adiciona um pequeno delay antes de redirecionar para a msg de erro ser visível
      setTimeout(() => navigate('/planos'), 1500);
    }
  // Adiciona location.state à lista de dependências (boa prática)
  }, [location.state, navigate]);

  const copyToClipboard = (textToCopy, type) => {
    // ... (função copyToClipboard permanece igual) ...
     navigator.clipboard.writeText(textToCopy).then(() => {
      message.success(`${type} copiado para a área de transferência!`);
    }, (err) => {
      message.error(`Não foi possível copiar o ${type}. Tente manualmente.`);
      console.error('Erro ao copiar: ', err);
    });
  };

  // --- Função renderContent (com placeholder QR e mais verificações) ---
  const renderContent = () => {
    // Verifica se paymentInfo AINDA é null (antes do useEffect terminar)
    if (!paymentInfo) {
        console.log("Renderizando Spin - paymentInfo ainda é null"); // Log
        return <Spin size="large" indicator={<LoadingOutlined spin />} />;
    }

    console.log("Renderizando conteúdo para status:", status, "e método:", paymentInfo.method); // Log

    // Renderiza status confirmado ou expirado
    if (status === 'confirmed') {
        return ( /* ... código do status confirmed ... */
             <div className="payment-status-container confirmed">
                 <CheckCircleOutlined className="status-icon" />
                 <Title level={3}>Pagamento Confirmado!</Title>
                 <Paragraph>Seu acesso ao {paymentInfo.planName} foi liberado.</Paragraph>
                 <Paragraph>Você será redirecionado para o painel em instantes.</Paragraph>
                 <Spin indicator={<LoadingOutlined spin />} />
            </div>
        );
    }
     if (status === 'expired') {
        return ( /* ... código do status expired ... */
             <div className="payment-status-container expired">
                 <ClockCircleOutlined className="status-icon" />
                 <Title level={3}>Tempo Expirado</Title>
                 <Paragraph>O tempo limite para realizar o pagamento foi atingido.</Paragraph>
                 <Button type="primary" onClick={() => navigate('/planos')}>Ver Planos Novamente</Button>
            </div>
        );
    }

    // Renderiza conteúdo pendente baseado no método
    switch (paymentInfo.method) {
      case 'pix':
        // Verifica se pixData existe antes de tentar usá-lo
        if (!paymentInfo.pixData) {
            console.error("Erro: Método é Pix mas pixData não foi encontrado em paymentInfo.");
            return <Paragraph type="danger">Erro ao carregar dados do Pix.</Paragraph>;
        }
        return (
          <Card title="Pague com Pix para Ativar" bordered={false} className="awaiting-card pix-card">
            <Paragraph className="instruction-text">Escaneie o QR Code abaixo com o app do seu banco ou copie o código Pix.</Paragraph>
            <div className="qr-code-container">
              {/* Placeholder QR Code */}
              <div className="qr-code-placeholder">
                 <span>QR Code Placeholder <br/> ({paymentInfo.amount.toFixed(2).replace('.',',')})</span>
              </div>
            </div>
            <Paragraph strong className="awaiting-timer-text">
               <ClockCircleOutlined /> O código expira em breve. Realize o pagamento para garantir seu acesso.
            </Paragraph>
            <div className="copy-paste-container">
              <Text strong>Ou copie o código (Pix Copia e Cola):</Text>
              <Input
                readOnly
                value={paymentInfo.pixData?.copyPasteCode || 'Código indisponível'}
                size="large"
                className="copy-paste-input"
                addonAfter={ /* ... botão copiar ... */
                    <Tooltip title="Copiar Código Pix">
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => copyToClipboard(paymentInfo.pixData?.copyPasteCode || '', 'Código Pix')}
                      type="text"
                      disabled={!paymentInfo.pixData?.copyPasteCode}
                    />
                  </Tooltip>
                }
              />
            </div>
             <div className="awaiting-spinner">
                <Spin indicator={<LoadingOutlined spin />} />
                <Text>Aguardando confirmação do pagamento...</Text>
             </div>
          </Card>
        );
      case 'boleto':
         // Verifica se boletoLink existe
         if (!paymentInfo.boletoLink) {
            console.error("Erro: Método é Boleto mas boletoLink não foi encontrado.");
            return <Paragraph type="danger">Erro ao carregar dados do Boleto.</Paragraph>;
         }
        return (
          <Card title="Pague o Boleto para Ativar" bordered={false} className="awaiting-card boleto-card">
             <Paragraph className="instruction-text">Clique para visualizar ou copie o código de barras para pagar.</Paragraph>
             <div className="boleto-actions">
                 <Button type="primary" size="large" href={paymentInfo.boletoLink} target="_blank" style={{ marginBottom: '1rem' }}>
                     Visualizar Boleto
                 </Button>
                  <div className="copy-paste-container">
                    <Text strong>Ou copie o código de barras:</Text>
                     <Input
                        readOnly
                        value={paymentInfo.boletoBarcode || 'Código indisponível'}
                        size="large"
                        className="copy-paste-input"
                        addonAfter={ /* ... botão copiar ... */
                            <Tooltip title="Copiar Código de Barras">
                                <Button
                                icon={<CopyOutlined />}
                                onClick={() => copyToClipboard(paymentInfo.boletoBarcode || '', 'Código de Barras')}
                                type="text"
                                disabled={!paymentInfo.boletoBarcode}
                                />
                            </Tooltip>
                        }
                    />
                 </div>
             </div>
             <Paragraph strong className="awaiting-timer-text">
               <ClockCircleOutlined /> Pagamentos por boleto podem levar até 3 dias úteis para serem confirmados.
            </Paragraph>
              <div className="awaiting-spinner">
                <Spin indicator={<LoadingOutlined spin />} />
                <Text>Aguardando confirmação do pagamento...</Text>
             </div>
          </Card>
        );
      case 'card':
      default:
        return (
            /* ... código do status processing ... */
           <div className="payment-status-container processing">
                 <Spin size="large" indicator={<LoadingOutlined spin />} />
                 <Title level={3} style={{ marginTop: '1rem' }}>Processando Pagamento</Title>
                 <Paragraph>Aguarde um instante enquanto confirmamos o pagamento do seu cartão...</Paragraph>
            </div>
        );
    }
  };
  // --- Fim Função renderContent ---

  // --- RETURN Principal ---
  return (
    <div className="awaiting-payment-page-container">
      {/* Verificação mais segura para o Header */}
      {typeof Header === 'function' ? <Header /> : <div style={{height: '60px', background: '#2b2b2b'}}></div>}
      <main className="awaiting-payment-content-wrapper">
        {renderContent()}
      </main>
      <FooterLP />
    </div>
  );
  // --- FIM RETURN Principal ---
};

export default AwaitingPaymentPage;