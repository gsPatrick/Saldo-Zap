// src/pages/Dashboard/Dashboard.jsx
// --- Importar useEffect e useState ---
import React, { useState, useEffect } from 'react';
// ------------------------------------
import { Typography, Card, Row, Col, Statistic, Button, Spin, Alert } from 'antd'; // Adicionar Spin e Alert
import {
    UserOutlined, DollarCircleOutlined, StarOutlined, SmileOutlined,
    CrownOutlined, ArrowUpOutlined, ArrowDownOutlined, CreditCardOutlined,
    LinkOutlined, LoadingOutlined // Ícone de Loading
} from '@ant-design/icons';
import './Dashboard.css';

const { Title, Text } = Typography;

// --- Definir URL da API ---
const API_URL = process.env.REACT_APP_API_URL || 'https://smart-api.ftslwl.easypanel.host';
// --------------------------

// Componente Dashboard
const Dashboard = () => {
  // --- Estados para os dados e controle ---
  const [dashboardData, setDashboardData] = useState(null); // Inicia como null
  const [loading, setLoading] = useState(true); // Inicia carregando
  const [error, setError] = useState(null); // Para mensagens de erro
  // --------------------------------------

  // --- Função para buscar dados da API ---
  const fetchDashboardData = async () => {
    setLoading(true); // Ativa o loading ao buscar
    setError(null); // Limpa erros anteriores
    try {
      console.log("Buscando dados do dashboard...");
      const response = await fetch(`${API_URL}/api/v1/auth/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Adicionar autenticação se este endpoint for protegido
           'x-api-key': 'SUA_API_KEY_AQUI' // Exemplo, use credenciais N8N se for o caso
        },
      });

      if (!response.ok) {
        // Tenta pegar erro da API ou usa status
        let errorMsg = `Erro ${response.status}`;
        try {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } catch (e) { /* Ignora erro no parse do erro */ }
        throw new Error(errorMsg); // Lança erro para o catch
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);

      // --- Processar dados recebidos da API ---
      // (Adapte conforme a estrutura real retornada pela sua API)
      let processedData = {
          usuariosAtivos: data.totalUsuarios || 0,
          usuariosFree: data.usuariosFree || 0,
          usuariosTrial: data.usuariosTrial || 0, // Se a API retornar
          usuariosBasic: data.usuariosPorPlano?.find(p => p.plano.toLowerCase().includes('basic'))?.count || 0,
          usuariosPremium: data.usuariosPorPlano?.find(p => p.plano.toLowerCase().includes('premium'))?.count || 0,
          // --- Lucro (Manter mockado ou buscar de outro endpoint) ---
          // Para este exemplo, vamos calcular um lucro SIMPLIFICADO baseado na contagem
          lucroPremium: (data.usuariosPorPlano?.find(p => p.plano.toLowerCase().includes('premium'))?.count || 0) * 29.90,
          lucroBasic: (data.usuariosPorPlano?.find(p => p.plano.toLowerCase().includes('basic'))?.count || 0) * 9.90,
          get lucroTotal() { return this.lucroPremium + this.lucroBasic; },
          // -----------------------------------------------------------
      };
      setDashboardData(processedData); // Atualiza o estado com os dados processados

    } catch (err) {
      console.error("Erro ao buscar dados do dashboard:", err);
      setError(err.message || "Falha ao carregar dados do dashboard."); // Define a mensagem de erro
      setDashboardData({}); // Define como objeto vazio para evitar erros de renderização
    } finally {
      setLoading(false); // Desativa o loading ao final
    }
  };
  // ------------------------------------

  // --- useEffect para buscar dados ao montar o componente ---
  useEffect(() => {
    fetchDashboardData(); // Chama a função de busca
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vazio significa que roda apenas uma vez, quando o componente monta
  // ------------------------------------------------------

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return 'R$ -';
    }
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const kiwifyPanelUrl = "https://dashboard.kiwify.com.br/"; // Ou Kirvano

  // --- Renderização Condicional (Loading e Erro) ---
  if (loading) {
    return (
      <div className="dashboard-page dashboard-loading">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#56935c' }} spin />} />
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page dashboard-error">
        <Alert
          message="Erro ao Carregar Dados"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={fetchDashboardData}>
              Tentar Novamente
            </Button>
          }
        />
      </div>
    );
  }
  // -------------------------------------------------

  // --- Renderização Principal (com dados) ---
  // Verifica se dashboardData existe antes de tentar acessar suas propriedades
  if (!dashboardData) return null; // Ou um placeholder diferente

  return (
    <div className="dashboard-page">
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: 24 }}>Dashboard</Title>

      {/* Linha 1: Cards de Usuários */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Ativos"
              // Usar dados do estado, com fallback 0
              value={dashboardData.usuariosAtivos ?? 0}
              precision={0}
              valueStyle={{ color: '#FFFFFF' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Free" // Inclui expirados e sem trial? Ajustar API se necessário
              value={dashboardData.usuariosFree ?? 0}
              precision={0}
              valueStyle={{ color: '#d1d5db' }}
              prefix={<SmileOutlined />}
            />
          </Card>
        </Col>
         <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Usuários Trial" // Se a API retornar esse dado
              value={dashboardData.usuariosTrial ?? 0}
              precision={0}
              valueStyle={{ color: '#fde68a' }} // Cor diferente para trial
              prefix={<StarOutlined />} // Ou outro ícone
            />
          </Card>
        </Col>
        {/* Ajuste nos cards de plano pago */}
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Assinantes Basic"
              value={dashboardData.usuariosBasic ?? 0}
              precision={0}
              valueStyle={{ color: '#bfdbfe' }}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
         <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Card className="dashboard-metric-card">
            <Statistic
              title="Assinantes Premium"
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
              title="Lucro Estimado Premium"
              value={dashboardData.lucroPremium ?? 0} // Usar dados do estado
              formatter={formatCurrency}
              valueStyle={{ color: '#adedb1' }}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card className="dashboard-metric-card">
             <Statistic
               title="Lucro Estimado Basic"
               value={dashboardData.lucroBasic ?? 0} // Usar dados do estado
               formatter={formatCurrency}
               valueStyle={{ color: '#bfdbfe' }}
               prefix={<DollarCircleOutlined />}
             />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card className="dashboard-metric-card dashboard-total-card">
             <Statistic
               title="Lucro Estimado Total"
               value={dashboardData.lucroTotal ?? 0} // Usar dados do estado
               formatter={formatCurrency}
               valueStyle={{ color: '#56935c', fontWeight: 'bold', fontSize: '2.2em' }}
               prefix={<DollarCircleOutlined />}
             />
           </Card>
        </Col>
      </Row>

      {/* Seção: Gateway de Pagamento (sem mudanças) */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
            <Card className="dashboard-gateway-card">
                 <Row align="middle" justify="space-between" wrap={false}>
                    <Col flex="auto" style={{ paddingRight: '16px' }}>
                        <Title level={4} style={{ color: '#FFFFFF', margin: 0, lineHeight: '1.3' }}>
                            <CreditCardOutlined style={{ marginRight: 10, color: '#56935c' }}/>
                            Painel do Gateway de Pagamento
                        </Title>
                        <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                            Acesse o painel da Kirvano para visualizar vendas, assinaturas e detalhes financeiros.
                        </Text>
                    </Col>
                    <Col flex="none">
                        <Button type="primary" href={kiwifyPanelUrl} target="_blank" icon={<LinkOutlined />} className="gateway-button">
                            Acessar Kirvano
                        </Button>
                    </Col>
                 </Row>
            </Card>
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;