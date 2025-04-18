// src/pages/AccountDetailsPage/AccountDetailsPage.jsx
import React, { useState, useEffect } from 'react';
// Removido useLocation/useNavigate para modo de teste, descomente se precisar
// import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Spin, Tag, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, WhatsAppOutlined, TagOutlined, CalendarOutlined, LoadingOutlined, IdcardOutlined } from '@ant-design/icons'; // Trocado Eye por Idcard
import Header from '../../componentsLP/Header/Header';
import FooterLP from '../../componentsLP/Footer/Footer';
import './AccountDetailsPage.css';

const { Title, Text, Paragraph } = Typography;

// Funções auxiliares (mantidas)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) return 'Data Inválida';
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) { return 'Erro na Data'; }
};

const getPlanTagColor = (planName) => {
    const planLower = planName?.toLowerCase() || '';
    if (planLower.includes('anual')) return 'success';
    if (planLower.includes('mensal')) return 'processing';
    if (planLower.includes('gratuito') || planLower.includes('teste')) return 'default';
    return 'default';
};

// Componente Placeholder Gráfico
const AccountGraphicPlaceholder = () => (
    <div className="account-graphic-placeholder">
        <IdcardOutlined />
         {/* Linhas decorativas */}
        <div className="graphic-line line-1"></div>
        <div className="graphic-line line-2"></div>
        <div className="graphic-line line-3"></div>
    </div>
);

const AccountDetailsPage = () => {
  // const location = useLocation(); // Comentado para teste
  // const navigate = useNavigate(); // Comentado para teste
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));

      let fetchedData = {};

      // --- MODO DE TESTE: SEMPRE USA DADOS MOCK ---
      console.warn("MODO DE TESTE: Usando dados mock para AccountDetails.");
      fetchedData = {
          name: 'Usuário Mock Teste',
          email: 'mock-teste@smartcusto.com',
          whatsappNumber: '5511998877665',
          plan: Math.random() > 0.66 ? 'Plano Anual' : (Math.random() > 0.33 ? 'Plano Mensal' : 'Teste Gratuito'),
          expiry: Math.random() > 0.5 ? '2025-11-30' : '2024-05-01',
          daysLeft: null
      };
      if (fetchedData.plan === 'Teste Gratuito') {
          fetchedData.expiry = null;
          fetchedData.daysLeft = Math.floor(Math.random() * 8);
      } else if (fetchedData.expiry && new Date(fetchedData.expiry + 'T23:59:59') < new Date()){
          fetchedData.daysLeft = null;
      } else {
          fetchedData.daysLeft = null;
      }
      // --- FIM MODO DE TESTE ---

      setUserData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []); // Roda só na montagem para teste

  // Função renderPlanStatus (mantida)
  const renderPlanStatus = () => {
    if (!userData) return null;
    const planLower = userData.plan?.toLowerCase() || '';
    const isFreeTrial = planLower.includes('gratuito') || planLower.includes('teste');

    let statusText = '';
    let statusClass = 'active'; // Padrão ativo

    if (isFreeTrial) {
        if (userData.daysLeft !== null && userData.daysLeft >= 0) {
            statusText = `Restam ${userData.daysLeft} dia(s) de teste.`;
            statusClass = 'info'; // Cor azul/info para teste ativo
        } else {
            statusText = 'Teste expirado.';
            statusClass = 'expired'; // Cor vermelha
        }
    } else if (userData.expiry) {
        const expiryDate = new Date(userData.expiry + 'T23:59:59');
        const today = new Date();
        const isExpired = expiryDate < today;
        statusText = `${isExpired ? 'Expirado em:' : 'Válido até:'} ${formatDate(userData.expiry)}`;
        statusClass = isExpired ? 'expired' : 'active'; // Vermelho ou verde
    } else {
        // Plano pago sem data de expiração (deve ser raro, mas é ativo)
        statusText = 'Plano Ativo';
        statusClass = 'active'; // Verde
    }

    return <Text className={`plan-status ${statusClass}`}>{statusText}</Text>;
};


  // Renderização principal
  return (
    <div className="account-details-page-container">
      {typeof Header === 'function' ? <Header /> : null}

      <main className="account-details-main-content">
         <div className="account-details-content-wrapper">
            <Title level={2} className="page-title">Detalhes da Conta</Title>
            <Paragraph className="page-subtitle">Visualize aqui suas informações cadastradas e status do plano.</Paragraph>

            <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
              {userData ? (
                // Card com animação
                <Card bordered={false} className="account-details-card animated-card">
                   {/* Placeholder Gráfico Acima */}
                   <AccountGraphicPlaceholder />

                   {/* Container das Informações (Layout de coluna única agora) */}
                  <div className="account-info-list">
                      {/* Item Nome */}
                      <div className="account-info-item">
                        <UserOutlined className="info-icon" />
                        <div className="info-text">
                          <Text className="info-label">Nome</Text>
                          <Text className="info-value">{userData.name}</Text>
                        </div>
                      </div>
                      <Divider className="info-divider"/>

                      {/* Item E-mail */}
                      <div className="account-info-item">
                        <MailOutlined className="info-icon" />
                        <div className="info-text">
                          <Text className="info-label">E-mail</Text>
                          <Text className="info-value">{userData.email}</Text>
                        </div>
                      </div>
                      <Divider className="info-divider"/>

                      {/* Item WhatsApp */}
                      <div className="account-info-item">
                        <WhatsAppOutlined className="info-icon" />
                        <div className="info-text">
                          <Text className="info-label">WhatsApp Conectado</Text>
                          <Text className="info-value">{userData.whatsappNumber}</Text>
                        </div>
                      </div>
                      <Divider className="info-divider"/>

                      {/* Item Plano */}
                      <div className="account-info-item">
                         <TagOutlined className="info-icon" />
                         <div className="info-text">
                            <Text className="info-label">Plano Atual</Text>
                            <Tag color={getPlanTagColor(userData.plan)} className="plan-tag">
                            {userData.plan}
                            </Tag>
                         </div>
                      </div>
                      {/* Não precisa de divider aqui */}

                       {/* Item Status (separado para clareza) */}
                       <div className="account-info-item">
                         <CalendarOutlined className="info-icon" />
                         <div className="info-text">
                            <Text className="info-label">Status / Validade</Text>
                            {renderPlanStatus()} {/* Renderiza o texto de status */}
                         </div>
                       </div>
                  </div>
                </Card>
              ) : (
                !loading && <Paragraph className="error-message">Não foi possível carregar os dados da conta.</Paragraph>
              )}
            </Spin>
         </div>
      </main>

      {typeof FooterLP === 'function' ? <FooterLP /> : null}
    </div>
  );
};

export default AccountDetailsPage;