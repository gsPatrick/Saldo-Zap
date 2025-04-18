// src/pages/Mensagens/Mensagens.jsx
import React, { useState, useMemo } from 'react';
import { Table, Tag, Select, Space, Typography, Button, Card, Tooltip, Row, Col, Input, Divider } from 'antd'; // Import completo
import { CheckSquareOutlined, BorderOutlined } from '@ant-design/icons';
import './Mensagens.css'; // Estilos

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input; // Usa TextArea

// --- Dados Mock ---
const initialUserData = [
    { id: '1', email: 'usuario1@email.com', nome: 'Alice Silva', plano: 'Premium', expiracao: '2024-12-31', diasRestantes: null, },
    { id: '2', email: 'joao.souza@email.com', nome: 'João Souza', plano: 'Free', expiracao: null, diasRestantes: 7, },
    { id: '3', email: 'maria.pereira@email.com', nome: 'Maria Pereira', plano: 'Basic', expiracao: '2024-08-15', diasRestantes: null, },
    { id: '4', email: 'carlos.rodrigues@email.com', nome: 'Carlos Rodrigues', plano: 'Free', expiracao: null, diasRestantes: 0, }, // Free Expirado
    { id: '5', email: 'ana.costa@email.com', nome: 'Ana Costa', plano: 'Premium', expiracao: '2025-03-01', diasRestantes: null, },
    { id: '6', email: 'pedro.santos@email.com', nome: 'Pedro Santos', plano: 'Basic', expiracao: '2023-11-01', diasRestantes: null, }, // Basic Expirado
    { id: '7', email: 'lucia.lima@email.com', nome: 'Lucia Lima', plano: 'Premium', expiracao: '2023-05-20', diasRestantes: null, }, // Premium Expirado
    { id: '8', email: 'fernando.oliveira@email.com', nome: 'Fernando Oliveira', plano: 'Free', expiracao: null, diasRestantes: 3, },
];

// Mapeamento de cores
const getPlanTagColor = (plano) => {
   switch (plano) { case 'Free': return 'default'; case 'Basic': return 'blue'; case 'Premium': return '#56935c'; default: return 'default'; }
};

// Verifica se plano pago está expirado
const isPaidPlanExpired = (expiracao) => {
    if (!expiracao) return false; try { const expiryDate = new Date(expiracao); expiryDate.setHours(23, 59, 59, 999); return expiryDate < new Date(); } catch (e) { return false; }
};

const Mensagens = () => {
  const [userData] = useState(initialUserData);
  const [filteredPlan, setFilteredPlan] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [messageText, setMessageText] = useState(''); // Estado para texto da mensagem

  // Calcula usuários expirados
  const usuariosExpirados = useMemo(() => {
    const expirados = { free: [], paid: [] };
    userData.forEach(user => {
      if (user.plano === 'Free' && user.diasRestantes === 0) { expirados.free.push(user.id); }
      else if ((user.plano === 'Basic' || user.plano === 'Premium') && isPaidPlanExpired(user.expiracao)) { expirados.paid.push(user.id); }
    });
    return expirados;
  }, [userData]);

  // Filtra dados da tabela
  const filteredTableData = useMemo(() => {
    if (filteredPlan === 'all') { return userData; }
    return userData.filter((user) => user.plano === filteredPlan);
  }, [userData, filteredPlan]);

  // Configuração da seleção de linhas
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  // Funções de seleção em massa
  const handleSelectByPlan = (plan) => { const keys = userData.filter(user => user.plano === plan).map(user => user.id); setSelectedRowKeys(keys); };
  const handleSelectExpiredFree = () => { setSelectedRowKeys(usuariosExpirados.free); };
  const handleSelectExpiredPaid = () => { setSelectedRowKeys(usuariosExpirados.paid); };
  const handleSelectAllVisible = () => { const keys = filteredTableData.map(user => user.id); setSelectedRowKeys(keys); };
  const handleClearSelection = () => { setSelectedRowKeys([]); };

  // Colunas da tabela
  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => a.nome.localeCompare(b.nome) },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Plano', dataIndex: 'plano', key: 'plano', width: 120, align: 'center', render: (plano) => (<Tag color={getPlanTagColor(plano)} key={plano}>{plano ? plano.toUpperCase() : ''}</Tag>), },
    { title: 'Status', key: 'status', width: 120, align: 'center', render: (text, record) => {
        if (record.plano === 'Free') { return record.diasRestantes === 0 ? <Tag color="red">Expirado</Tag> : <Tag color="green">Ativo</Tag>; }
        else if (record.plano === 'Basic' || record.plano === 'Premium') { return isPaidPlanExpired(record.expiracao) ? <Tag color="red">Expirado</Tag> : <Tag color="green">Ativo</Tag>; }
        return '-';
      },
      filters: [ { text: 'Ativo', value: 'ativo' }, { text: 'Expirado', value: 'expirado' } ],
      onFilter: (value, record) => {
        const expiradoFree = record.plano === 'Free' && record.diasRestantes === 0;
        const expiradoPago = (record.plano === 'Basic' || record.plano === 'Premium') && isPaidPlanExpired(record.expiracao);
        const isExpired = expiradoFree || expiradoPago;
        if (value === 'ativo') return !isExpired; if (value === 'expirado') return isExpired; return true;
      },
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;
  const canSendMessage = hasSelected && messageText.trim().length > 0;

  // Função (simulada) de envio
  const handleSendMessage = () => {
    if (!canSendMessage) return;
    console.log(`Enviando mensagem para ${selectedRowKeys.length} usuários:`);
    console.log(`IDs Selecionados: ${selectedRowKeys.join(', ')}`);
    console.log(`Mensagem: ${messageText}`);
    alert(`Mensagem (simulada) enviada para ${selectedRowKeys.length} usuário(s)!`);
  };

  return (
    <div className="mensagens-page">
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Mensagens em Massa</Title>
      {/* Card de Filtros e Ações */}
      <Card className="mensagens-card" style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} justify="space-between" align="bottom">
          <Col xs={24} sm={8} md={6}> <Text strong>Filtrar por Plano</Text> <Select value={filteredPlan} onChange={setFilteredPlan} style={{ width: '100%' }}><Option value="all">Todos</Option><Option value="Free">Free</Option><Option value="Basic">Basic</Option><Option value="Premium">Premium</Option></Select> </Col>
          <Col xs={24} sm={16} md={18}> <Text strong>Seleção Rápida</Text> <Space wrap style={{ marginTop: '8px' }}><Button onClick={() => handleSelectByPlan('Free')} size="small">Todos Free</Button><Button onClick={() => handleSelectByPlan('Basic')} size="small">Todos Basic</Button><Button onClick={() => handleSelectByPlan('Premium')} size="small">Todos Premium</Button><Button danger onClick={handleSelectExpiredFree} size="small" disabled={usuariosExpirados.free.length === 0}>Free Expirados ({usuariosExpirados.free.length})</Button><Button danger onClick={handleSelectExpiredPaid} size="small" disabled={usuariosExpirados.paid.length === 0}>Pagos Expirados ({usuariosExpirados.paid.length})</Button><Button type="dashed" onClick={handleSelectAllVisible} size="small">Todos Visíveis</Button></Space> </Col>
        </Row>
      </Card>
      {/* Feedback de Seleção */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}> {hasSelected ? `Selecionado(s): ${selectedRowKeys.length}` : 'Nenhum usuário selecionado'} </span> {hasSelected && ( <Button onClick={handleClearSelection} size="small" type="link" danger> Limpar Seleção </Button> )} </div>
      {/* Tabela */}
      <Table rowSelection={rowSelection} columns={columns} dataSource={filteredTableData} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 'max-content', y: 'calc(100vh - 520px)' }} className="mensagens-table" size="small" />
      {/* Área de Mensagem e Envio */}
      <Divider style={{ borderColor: '#444' }} />
      <div className="message-area" style={{ marginTop: '16px' }}>
          <Title level={4} style={{ color: '#FFFFFF', marginBottom: '16px' }}> Enviar Mensagem para {selectedRowKeys.length} usuário(s) selecionado(s) </Title>
          <TextArea rows={4} placeholder={hasSelected ? "Digite sua mensagem aqui..." : "Selecione usuários na tabela acima para enviar uma mensagem."} value={messageText} onChange={(e) => setMessageText(e.target.value)} disabled={!hasSelected} maxLength={500} showCount className="message-textarea" />
          <Button type="primary" style={{ marginTop: '16px' }} disabled={!canSendMessage} onClick={handleSendMessage} className="send-button" > Enviar via WhatsApp (Simulado) </Button>
      </div>
    </div>
  );
};
export default Mensagens;