// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Typography, Card, Row, Col, Statistic, Button } from 'antd'; // Importações necessárias
import {
    UserOutlined,
    DollarCircleOutlined,
    StarOutlined, // Ícone para Basic
    SmileOutlined, // Ícone para Free
    CrownOutlined, // Ícone para Premium
    ArrowUpOutlined,
    ArrowDownOutlined,
    CreditCardOutlined, // Ícone para Gateway
    LinkOutlined // Ícone para o botão de link
} from '@ant-design/icons';
import './Dashboard.css'; // Importa o CSS específico

const { Title, Text } = Typography; // Desestrutura Text também

// --- Lógica Mock para os Dados do Dashboard ---
const mockDashboardData = {
  usuariosAtivos: 153,
  usuariosFree: 85,
  usuariosBasic: 26, // Adicionado para o card
  usuariosPremium: 42,
  lucroPremium: 42 * 29.90, // Exemplo: Premium custa 29.90
  lucroBasic: 26 * 9.90,   // Exemplo: Basic custa 9.90
  // Lucro total é a soma dos lucros dos planos pagos
  get lucroTotal() {
    return this.lucroPremium + this.lucroBasic;
  },
};
// --- Fim da Lógica Mock ---

// Componente Dashboard
const Dashboard = () => {
  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    // Verifica se o valor é numérico antes de formatar
    if (typeof value !== 'number' || isNaN(value)) {
        return 'R$ -'; // Ou algum placeholder apropriado
    }
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // URL para o painel do gateway (substitua pela URL real)
  const kiwifyPanelUrl = "https://dashboard.kiwify.com.br/"; // Exemplo

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
              value={mockDashboardData.usuariosAtivos}
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
              value={mockDashboardData.usuariosFree}
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
              value={mockDashboardData.usuariosBasic}
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
              value={mockDashboardData.usuariosPremium}
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
              value={mockDashboardData.lucroPremium}
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
               value={mockDashboardData.lucroBasic}
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
               value={mockDashboardData.lucroTotal}
               formatter={formatCurrency}
               valueStyle={{ color: '#56935c', fontWeight: 'bold', fontSize: '2.2em' }}
               prefix={<DollarCircleOutlined />}
             />
           </Card>
        </Col>
      </Row>

      {/* Seção: Gateway de Pagamento */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}> {/* Adicionado marginTop */}
        <Col span={24}> {/* Ocupa toda a largura */}
            <Card className="dashboard-gateway-card"> {/* Nova classe CSS */}
                 {/* Usa Row/Col interno para layout Título/Botão */}
                 <Row align="middle" justify="space-between" wrap={false}> {/* wrap=false para tentar manter na mesma linha */}
                    {/* Coluna do Título e Descrição */}
                    <Col flex="auto" style={{ paddingRight: '16px' }}> {/* flex=auto para ocupar espaço disponível */}
                        <Title level={4} style={{ color: '#FFFFFF', margin: 0, lineHeight: '1.3' }}> {/* Ajuste no lineHeight */}
                            <CreditCardOutlined style={{ marginRight: 10, color: '#56935c' }}/>
                            Painel do Gateway de Pagamento
                        </Title>
                        <Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
                            Acesse o painel da Kirvano para visualizar vendas, assinaturas e detalhes financeiros.
                        </Text>
                    </Col>
                    {/* Coluna do Botão */}
                    <Col flex="none"> {/* flex=none para ocupar apenas o espaço necessário */}
                        <Button
                            type="primary"
                            href={kiwifyPanelUrl} // Link para o painel
                            target="_blank" // Abre em nova aba
                            icon={<LinkOutlined />} // Ícone de Link
                            className="gateway-button" // Classe para estilo
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