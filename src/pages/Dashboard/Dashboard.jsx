// src/pages/Dashboard/Dashboard.jsx
// --- Importações Atualizadas ---
import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Statistic, Button, Spin, Alert } from 'antd'; // Adicionado Spin e Alert
import {
    UserOutlined, DollarCircleOutlined, StarOutlined, SmileOutlined,
    CrownOutlined, ArrowUpOutlined, ArrowDownOutlined, CreditCardOutlined,
    LinkOutlined, LoadingOutlined // Adicionado LoadingOutlined
} from '@ant-design/icons';
import './Dashboard.css'; // Importa o CSS específico
// ----------------------------

const { Title, Text } = Typography;

// --- Constantes da API ---
const API_URL = 'https://smart-api.ftslwl.easypanel.host';
// IMPORTANTE: Substitua pela sua API Key real ou remova o header se não for necessário
const API_KEY = 'SUA_API_KEY_AQUI';
// -----------------------

// --- Preços dos Planos (para cálculo de lucro estimado) ---
const PRECO_PREMIUM = 29.90;
const PRECO_BASIC = 9.90;
// ------------------------------------------------------

// Componente Dashboard
const Dashboard = () => {
  // --- Estados para dados, loading e erro ---
  const [dashboardData, setDashboardData] = useState(null); // Dados da API
  const [loading, setLoading] = useState(true); // Controla o estado de carregamento
  const [error, setError] = useState(null); // Armazena mensagens de erro
  // -----------------------------------------

  // --- Função para buscar dados da API ---
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Buscando dados do dashboard...");
      const response = await fetch(`${API_URL}/api/v1/auth/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY // Adiciona a chave da API ao header
        },
      });

      if (!response.ok) {
        let errorMsg = `Erro HTTP: ${response.status}`;
        try {
          const errData = await response.json();
          errorMsg = errData.message || errData.error || errorMsg;
        } catch (parseError) { /* Ignora erro no parse */ }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("Dados brutos recebidos da API:", data);

      // --- Processa os dados para o estado ---
      // Adapte este mapeamento conforme a ESTRUTURA REAL da sua API
      const usuariosBasicCount = data.usuariosPorPlano?.find(p => p.plano?.toLowerCase().includes('basic'))?.count ?? 0;
      const usuariosPremiumCount = data.usuariosPorPlano?.find(p => p.plano?.toLowerCase().includes('premium'))?.count ?? 0;
      const lucroPremiumCalc = usuariosPremiumCount * PRECO_PREMIUM;
      const lucroBasicCalc = usuariosBasicCount * PRECO_BASIC;

      const processedData = {
          usuariosAtivos: data.totalUsuarios ?? 0,
          usuariosFree: data.usuariosFree ?? 0,
          usuariosBasic: usuariosBasicCount, // Usando contagem calculada
          usuariosPremium: usuariosPremiumCount, // Usando contagem calculada
          lucroPremium: lucroPremiumCalc, // Usando lucro calculado
          lucroBasic: lucroBasicCalc, // Usando lucro calculado
          // O getter calcula o total dinamicamente
          get lucroTotal() { return (this.lucroPremium ?? 0) + (this.lucroBasic ?? 0); },
      };
      console.log("Dados processados para o estado:", processedData);
      setDashboardData(processedData);

    } catch (err) {
      console.error("Erro detalhado ao buscar dados do dashboard:", err);
      setError(err.message || "Falha ao carregar dados. Verifique a API ou a chave.");
      setDashboardData({}); // Define como objeto vazio para evitar erros de renderização
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------

  // --- useEffect para buscar na montagem ---
  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Roda uma vez
  // ---------------------------------------

  // Função para formatar moeda (sem alterações)
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) { return 'R$ -'; }
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // URL do Gateway (sem alterações)
  const kiwifyPanelUrl = "https://dashboard.kiwify.com.br/"; // Ou Kirvano

  // --- Renderização Condicional (Loading / Erro) ---
  if (loading) {
    return (
      <div className="dashboard-page dashboard-loading">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#56935c' }} spin />} />
        <p style={{ color: 'white', marginTop: '16px' }}>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page dashboard-error">
        <Alert
          message={<span style={{ color: '#ff4d4f', fontWeight: 'bold'}}>Erro ao Carregar Dados</span>}
          description={<span style={{ color: 'rgba(255,255,255,0.8)' }}>{error}</span>}
          type="error" showIcon
          style={{ background: '#44201f', borderColor: '#802a27'}}
          action={ <Button size="small" danger onClick={fetchDashboardData}> Tentar Novamente </Button> }
        />
      </div>
    );
  }

  // Garante que temos dados antes de renderizar o layout principal
  if (!dashboardData) {
    return null; // Evita erro se data for null/{} após erro ou estado inicial
  }
  // --- FIM Renderização Condicional ---


  // --- RETURN PRINCIPAL (Estrutura Idêntica ao Original, usando dados do state) ---
  return (
    <div className="dashboard-page">
      {/* Título da Página */}
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: 24 }}>Dashboard</Title>

      {/* Linha 1: Cards de Usuários */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Card: Usuários Ativos */}
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Ativos"
              value={dashboardData.usuariosAtivos ?? 0} 
              precision={0}
              valueStyle={{ color: '#FFFFFF' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        {/* Card: Usuários Free */}
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Free"
              value={dashboardData.usuariosFree ?? 0} 
              precision={0}
              valueStyle={{ color: '#d1d5db' }}
              prefix={<SmileOutlined />}
            />
          </Card>
        </Col>
        {/* Card: Usuários Basic */}
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Basic"
              value={dashboardData.usuariosBasic ?? 0} 
              precision={0}
              valueStyle={{ color: '#bfdbfe' }}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
        {/* Card: Usuários Premium */}
         <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Premium"
              value={dashboardData.usuariosPremium ?? 0} 
              precision={0}
              valueStyle={{ color: '#adedb1' }}
              prefix={<CrownOutlined />}
             />
          </Card>
        </Col>
      </Row>

       {/* Linha 2: Cards de Lucro */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
         {/* Card: Lucro Usuários Premium */}
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Lucro Premium"
              value={dashboardData.lucroPremium ?? 0} 
              formatter={formatCurrency}
              valueStyle={{ color: '#adedb1' }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        {/* Card: Lucro Usuários Basic */}
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card className="dashboard-metric-card">
             <Statistic
               title="Lucro Basic"
               value={dashboardData.lucroBasic ?? 0} 
               formatter={formatCurrency}
               valueStyle={{ color: '#bfdbfe' }}
               prefix={<DollarCircleOutlined />}
             />
          </Card>
        </Col>
        {/* Card: Lucro Total */}
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card className="dashboard-metric-card dashboard-total-card">
             <Statistic
               title="Lucro Total"
               value={dashboardData.lucroTotal ?? 0} 
               formatter={formatCurrency}
               valueStyle={{ color: '#56935c', fontWeight: 'bold', fontSize: '2.2em' }}
               prefix={<DollarCircleOutlined />}
             />
           </Card>
        </Col>
      </Row>

      {/* Seção: Gateway de Pagamento (Mantida igual) */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
            <Card className="dashboard-gateway-card">
                 <Row align="middle" justify="space-between" wrap={false}>
                    <Col flex="auto" style={{ paddingRight: '16px' }}>
                        <Title level={4} style={{ color: '#FFFFFF', margin: 0, lineHeight: '1.3' }}>
                            <CreditCardOutlined style={{ marginRight: 10, color: '#56935c' }}/>
                            Painel do Gateway de Pagamento
                        </Title>
                        <Text type="secondary" style={{ display: 'block', marginTop: '4px', color: 'rgba(255,255,255,0.65)' }}> {/* Cor clara forçada */}
                            Acesse o painel da Kirvano para visualizar vendas, assinaturas e detalhes financeiros.
                        </Text>
                    </Col>
                    <Col flex="none">
                        <Button
                            type="primary"
                            href={kiwifyPanelUrl}
                            target="_blank"
                            icon={<LinkOutlined />}
                            className="gateway-button"
                        >
                            Acessar Kirvano
                        </Button>
                    </Col>
                 </Row>
            </Card>
        </Col>
      </Row>
      {/* Fim da Seção Gateway */}

    </div> // Fim div .dashboard-page
  );
};

export default Dashboard; // Exporta o componente