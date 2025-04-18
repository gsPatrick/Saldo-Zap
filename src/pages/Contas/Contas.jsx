// src/pages/Contas/Contas.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Tag, Input, Checkbox, Space, Typography, Tooltip, Card, Row, Col, Spin, Alert, message, Pagination } from 'antd';
import { InfoCircleOutlined, LoadingOutlined, WhatsAppOutlined } from '@ant-design/icons'; // Adicionado WhatsAppOutlined
import debounce from 'lodash.debounce';
import './Contas.css';

const { Search } = Input;
const { Text, Title } = Typography;

// --- Configurações da API ---
const API_URL = 'https://smart-api.ftslwl.easypanel.host';
const API_KEY = 'SUA_API_KEY_AQUI'; // <<< SUBSTITUA
// -----------------------------

// --- Funções Helper ---
const getPlanTagColor = (plano) => {
  if (!plano) return 'default';
  switch (plano) {
    case 'Free': return 'default';
    case 'Basic': return 'blue';
    case 'Premium': return '#56935c';
    default:
        if (String(plano).toLowerCase().includes('trial')) return 'default';
        return 'default';
  }
};

const planOptions = [
  { label: 'Free', value: 'Free' },
  { label: 'Basic', value: 'Basic' },
  { label: 'Premium', value: 'Premium' },
];

const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) { return <Text type="danger">Inválida</Text>; }
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return <span style={{color: '#ccc'}}>{`${day}/${month}/${year}`}</span>;
    } catch (error) { return <Text type="danger">Erro</Text>; }
};
// --- Fim Funções Helper ---


// --- Componente ---
const Contas = () => {
  // --- Estados ---
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [selectedPlans, setSelectedPlans] = useState([]);
  // Paginação será client-side pela Tabela

  // --- Função Debounced ---
  const debouncedFilterUpdate = useCallback( debounce((value) => { setDebouncedSearchText(value); }, 300), [] );
  const handleSearchChange = (e) => { const value = e.target.value; setSearchText(value); debouncedFilterUpdate(value); };
  // --- Fim Debounce ---


  // --- Função para buscar dados da API ---
  const fetchAllUsers = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`${API_URL}/api/v1/usuarios/allUsers`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      });
      if (!response.ok) { /* ... tratamento de erro ... */
         let errorMsg = `Erro ${response.status}`; try { const errData = await response.json(); errorMsg = errData.error || errData.message || errorMsg; } catch (e) {} throw new Error(errorMsg);
      }
      const data = await response.json();
      // --- Formatação (Incluindo telefone) ---
      const formattedData = (data.users || []).map(user => {
            let diasRestantes = null; let expiracaoFormatada = null; let planoReal = user.plano || 'Free';
             if (!user.assinatura_ativa && user.trial_fim) {
                 const trialEnd = new Date(user.trial_fim); const hoje = new Date();
                 if (!isNaN(trialEnd.getTime())) { const diff = Math.ceil((trialEnd.setHours(23,59,59,999) - hoje) / (1000 * 60 * 60 * 24)); diasRestantes = diff < 0 ? 0 : diff; }
                 planoReal = 'Free';
             } else if (user.assinatura_ativa && user.assinatura_expira_em) { expiracaoFormatada = user.assinatura_expira_em.split('T')[0]; }
            return {
                id: user.id_usuario, email: user.email || '-', nome: user.nome || '-',
                plano: planoReal, expiracao: expiracaoFormatada, diasRestantes: diasRestantes,
                telefone: user.telefone || '-', // <<< ADICIONADO TELEFONE AQUI
            };
        });
      setAllUserData(formattedData);
    } catch (err) { /* ... tratamento de erro ... */
        console.error("Erro ao buscar todos os usuários:", err); setError(err.message || "Falha ao carregar lista de contas."); setAllUserData([]);
    } finally { setLoading(false); }
  }, [API_KEY]);

  // --- useEffect para buscar dados ---
  useEffect(() => { fetchAllUsers(); }, [fetchAllUsers]);

  // --- Lógica de Filtro (CLIENT-SIDE) ---
  const filteredData = useMemo(() => {
    let data = allUserData;
    if (debouncedSearchText) {
      const lowerSearchText = debouncedSearchText.toLowerCase();
      data = data.filter(item =>
          (item.email && item.email.toLowerCase().includes(lowerSearchText)) ||
          (item.nome && item.nome.toLowerCase().includes(lowerSearchText)) ||
          (item.telefone && item.telefone.includes(lowerSearchText)) // <<< ADICIONADO FILTRO POR TELEFONE
      );
    }
    if (selectedPlans.length > 0) {
      data = data.filter(item => item.plano && selectedPlans.includes(item.plano));
    }
    return data;
  }, [allUserData, debouncedSearchText, selectedPlans]); // Adicionado telefone à dependência implícita
  // --- Fim Lógica de Filtro ---


  // --- Definição das Colunas da Tabela (Adicionada Coluna Telefone) ---
  const columns = useMemo(() => [
    { title: 'Email', dataIndex: 'email', key: 'email', sorter: (a, b) => (a.email || '').localeCompare(b.email || ''), width: 250 },
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => (a.nome || '').localeCompare(b.nome || ''), width: 180 }, // Largura ajustada
    // <<< NOVA COLUNA TELEFONE >>>
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
      width: 150, // Largura ajustada
      render: (phone) => phone && phone !== '-' ? <><WhatsAppOutlined style={{color:'#25D366', marginRight: '5px'}} /> {phone}</> : '-',
    },
    // <<< FIM NOVA COLUNA >>>
    { title: 'Plano', dataIndex: 'plano', key: 'plano', width: 120, align: 'center', render: (plano) => ( <Tag color={getPlanTagColor(plano)} key={plano}>{plano ? String(plano).toUpperCase() : ''}</Tag> ) },
    { title: 'Expiração / Dias Restantes', key: 'expiracao', align: 'center', width: 200,
      sorter: (a, b) => { /* ... lógica sorter original ... */
          const valA = a.plano === 'Free' ? (a.diasRestantes ?? -Infinity) : new Date(a.expiracao || 0);
          const valB = b.plano === 'Free' ? (b.diasRestantes ?? -Infinity) : new Date(b.expiracao || 0);
          const dateA = new Date(a.expiracao + 'T00:00:00');
          const dateB = new Date(b.expiracao + 'T00:00:00');
          if (a.plano === 'Free' && b.plano !== 'Free') return -1;
          if (a.plano !== 'Free' && b.plano === 'Free') return 1;
          if (a.plano === 'Free' && b.plano === 'Free') return (valB) - (valA);
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          return dateA - dateB;
       },
      render: (text, record) => { /* ... lógica render original ... */
          if (record.plano === 'Free') {
            const dias = record.diasRestantes;
            if (typeof dias === 'number') {
                const style = dias === 0 ? { color: '#ff4d4f', fontWeight: 'bold' } : { color: '#ccc'};
                return <span style={style}>{dias} dia(s)</span>;
            }
             return <Tag color="default">FREE</Tag>;
          } else if (record.plano === 'Basic' || record.plano === 'Premium') {
             return formatDate(record.expiracao);
          }
          return <span style={{color: '#888'}}>-</span>;
       },
    },
  ], []);
  // --- Fim Colunas ---


  // --- Renderização (Placeholder da busca atualizado) ---
  return (
    <>
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Gerenciamento de Contas</Title>

      <Card className="filter-card" style={{ marginBottom: '24px' }}>
         <Row gutter={[16, 16]} align="bottom">
            <Col xs={24} sm={12} md={10} lg={8} xl={6}>
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Buscar</Text>
                <Search
                    placeholder="Email, Nome ou Telefone" // <<< PLACEHOLDER ATUALIZADO
                    allowClear
                    value={searchText}
                    onChange={handleSearchChange}
                    onSearch={(value) => setDebouncedSearchText(value)}
                    style={{ width: '100%' }}
                    enterButton
                />
            </Col>
             <Col xs={24} sm={12} md={14} lg={16} xl={18}>
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Filtrar por Plano</Text>
                <Checkbox.Group
                    options={planOptions}
                    value={selectedPlans}
                    onChange={(checkedValues) => setSelectedPlans(checkedValues)}
                    style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}
                />
             </Col>
         </Row>
      </Card>

      {error && (
         <Alert message="Erro ao Carregar Contas" description={error} type="error" showIcon style={{ marginBottom: 16 }}/>
      )}

      <Table
        columns={columns} // <<< USA AS COLUNAS ATUALIZADAS
        dataSource={filteredData}
        rowKey="id"
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }}
        pagination={{
            pageSize: 10,
            showSizeChanger: false,
            style: { marginTop: 24, textAlign: 'right' },
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} contas filtradas` // Ajuste texto
        }}
        scroll={{ x: 'max-content' }}
        className="contas-table"
        locale={{ emptyText: loading ? 'Carregando...' : 'Nenhuma conta encontrada' }}
      />
    </>
  );
};

export default Contas;