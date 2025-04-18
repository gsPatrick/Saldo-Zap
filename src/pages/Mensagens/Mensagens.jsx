// src/pages/Mensagens/Mensagens.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Added useEffect, useCallback
import { Table, Tag, Select, Space, Typography, Button, Card, Tooltip, Row, Col, Input, Divider, Spin, Alert, message, Pagination } from 'antd'; // Added Spin, Alert, message, Pagination
import { CheckSquareOutlined, BorderOutlined, LoadingOutlined } from '@ant-design/icons'; // Added LoadingOutlined
import './Mensagens.css'; // Estilos

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

// --- Configurações da API ---
const API_URL = 'https://smart-api.ftslwl.easypanel.host';
const API_KEY = 'SUA_API_KEY_AQUI'; // <<< SUBSTITUA PELA SUA CHAVE
// -----------------------------

// --- Funções Helper (Reutilizadas) ---
const getPlanTagColor = (plano) => {
   if (!plano) return 'default';
   const lowerPlano = String(plano).toLowerCase();
   if (lowerPlano.includes('free') || lowerPlano.includes('trial')) return 'default';
   if (lowerPlano.includes('basic')) return 'blue';
   if (lowerPlano.includes('premium')) return '#56935c';
   return 'default';
};

const isPaidPlanExpired = (expiracao) => {
    if (!expiracao) return false;
    try {
        const expiryDate = new Date(expiracao + 'T23:59:59'); // Considera fim do dia
        return expiryDate < new Date();
    } catch (e) {
        console.error("Erro ao verificar expiração:", e, expiracao);
        return false; // Assume não expirado em caso de erro
    }
};
// --- Fim Funções Helper ---


const Mensagens = () => {
  // --- Estados ---
  const [allUserData, setAllUserData] = useState([]); // Armazena todos os usuários da API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filtros e Seleção (como no original)
  const [filteredPlan, setFilteredPlan] = useState('all'); // Filtro de plano selecionado ('all', 'Free', 'Basic', 'Premium')
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Chaves (IDs) das linhas selecionadas
  const [messageText, setMessageText] = useState(''); // Texto da mensagem a ser enviada
  // Paginação (será controlada pela Tabela AntD)
  // -----------------

  // --- Função para buscar TODOS os usuários da API ---
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Buscando TODOS os usuários para Mensagens...");
    try {
      const response = await fetch(`${API_URL}/api/v1/usuarios/allUsers`, { // Tenta buscar limite alto
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      });
      if (!response.ok) { /* ... tratamento de erro ... */
          let errorMsg = `Erro ${response.status}`; try { const errData = await response.json(); errorMsg = errData.error || errData.message || errorMsg; } catch (e) {} throw new Error(errorMsg);
      }
      const data = await response.json();
      console.log("Usuários recebidos (Mensagens):", data);

      // --- Formatação dos Dados (similar a Contas, mantendo campos relevantes) ---
      const formattedData = (data.users || []).map(user => {
            let diasRestantes = null;
            let expiracaoFormatada = null;
            let planoReal = user.plano || 'Free';
            let ativo = user.assinatura_ativa || false; // Status de atividade

             if (!user.assinatura_ativa && user.trial_fim) {
                 const trialEnd = new Date(user.trial_fim);
                 const hoje = new Date();
                 if (!isNaN(trialEnd.getTime())) {
                    const diff = Math.ceil((trialEnd.setHours(23,59,59,999) - hoje) / (1000 * 60 * 60 * 24));
                    diasRestantes = diff < 0 ? 0 : diff;
                    // Considera ativo se ainda estiver no trial
                    if (diasRestantes > 0) ativo = true;
                 }
                 planoReal = 'Free';
             } else if (user.assinatura_ativa && user.assinatura_expira_em) {
                 expiracaoFormatada = user.assinatura_expira_em.split('T')[0];
                 // Considera ativo se a assinatura está ativa e não expirada
                 ativo = !isPaidPlanExpired(expiracaoFormatada);
             } else if (!user.assinatura_ativa && !user.trial_fim) {
                 // Free normal, consideramos ativo por padrão aqui (pode ajustar)
                 ativo = true;
                 planoReal = 'Free';
             }

            return {
                id: user.id_usuario, // Chave única
                email: user.email || '-',
                nome: user.nome || '-',
                plano: planoReal, // Plano base (Free, Basic, Premium)
                expiracao: expiracaoFormatada,
                diasRestantes: diasRestantes, // Só para Free/Trial
                statusOriginal: ativo ? 'ativo' : 'expirado' // Status calculado para filtro
            };
        });
      // ---------------------------------------------------------------------
      setAllUserData(formattedData);

    } catch (err) { /* ... tratamento de erro ... */
        console.error("Erro ao buscar usuários para Mensagens:", err); setError(err.message || "Falha ao carregar lista de contas."); setAllUserData([]);
    } finally { setLoading(false); }
  }, [API_KEY]); // Dependência

  // --- useEffect para buscar dados ao montar ---
  useEffect(() => { fetchAllUsers(); }, [fetchAllUsers]);

  // --- Lógica de Filtro e Cálculo (CLIENT-SIDE - como no original) ---

  // Calcula usuários expirados (baseado nos dados da API)
  const usuariosExpirados = useMemo(() => {
    const expirados = { free: [], paid: [] };
    allUserData.forEach(user => {
      // Free expirado: plano é Free E (diasRestantes é 0 OU statusOriginal é 'expirado' se veio da API assim)
      if (user.plano === 'Free' && (user.diasRestantes === 0 || user.statusOriginal === 'expirado')) {
          expirados.free.push(user.id);
      }
      // Pago expirado: plano NÃO é Free E está expirado (pela data ou status)
      else if (user.plano !== 'Free' && (isPaidPlanExpired(user.expiracao) || user.statusOriginal === 'expirado')) {
          expirados.paid.push(user.id);
      }
    });
    return expirados;
  }, [allUserData]);

  // Filtra dados da tabela para exibição (baseado no select e dados da API)
  const filteredTableData = useMemo(() => {
    let data = allUserData;
    if (filteredPlan !== 'all') {
        // Filtra pelo nome base do plano
        data = data.filter((user) => user.plano === filteredPlan);
    }
    // Adiciona filtro de status da coluna aqui se for mantido client-side
    // (A lógica de filtro da coluna foi mantida nas definições das colunas)
    return data;
  }, [allUserData, filteredPlan]);
  // --- Fim Filtro e Cálculo ---


  // --- Configuração da Seleção de Linhas (Idêntica) ---
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    // Preservar seleção entre páginas (se usar paginação server-side no futuro)
    // preserveSelectedRowKeys: true,
  };

  // --- Funções de Seleção em Massa (Ajustadas para usar allUserData) ---
  const handleSelectByPlan = (plan) => {
    const keys = allUserData.filter(user => user.plano === plan).map(user => user.id);
    setSelectedRowKeys(keys);
  };
  const handleSelectExpiredFree = () => { setSelectedRowKeys(usuariosExpirados.free); };
  const handleSelectExpiredPaid = () => { setSelectedRowKeys(usuariosExpirados.paid); };
  const handleSelectAllVisible = () => {
     // Seleciona todos os que estão VISÍVEIS na tabela FILTRADA atualmente
    const keys = filteredTableData.map(user => user.id);
    setSelectedRowKeys(keys);
   };
  const handleClearSelection = () => { setSelectedRowKeys([]); };
  // --- Fim Funções de Seleção ---


  // --- Colunas da Tabela (Mantida estrutura original, render ajustado) ---
  const columns = useMemo(() => [ // Envolvido em useMemo
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => (a.nome || '').localeCompare(b.nome || '') },
    { title: 'Email', dataIndex: 'email', key: 'email' }, // Sorter pode ser adicionado
    { title: 'Plano', dataIndex: 'plano', key: 'plano', width: 120, align: 'center',
      render: (plano) => (<Tag color={getPlanTagColor(plano)} key={plano}>{plano ? String(plano).toUpperCase() : ''}</Tag>),
    },
    { title: 'Status', key: 'status', width: 120, align: 'center',
      render: (_, record) => { // Usa o statusOriginal calculado
        const isExpired = record.statusOriginal === 'expirado';
        return <Tag color={isExpired ? "red" : "green"}>{isExpired ? 'Expirado' : 'Ativo'}</Tag>;
      },
      // Filtro da coluna AntD (opera sobre os dados JÁ FILTRADOS pela seleção de plano)
      filters: [ { text: 'Ativo', value: 'ativo' }, { text: 'Expirado', value: 'expirado' } ],
      onFilter: (value, record) => record.statusOriginal === value,
    },
  ], []); // Sem dependências externas para as colunas em si
  // --- Fim Colunas ---


  // --- Lógica de Envio (Mantida como Simulada) ---
  const hasSelected = selectedRowKeys.length > 0;
  const canSendMessage = hasSelected && messageText.trim().length > 0;

  const handleSendMessage = () => {
    if (!canSendMessage) return;
    setLoading(true); // <<< Adicionar loading aqui
    console.log(`Enviando mensagem para ${selectedRowKeys.length} usuários:`);
    console.log(`IDs Selecionados: ${selectedRowKeys.join(', ')}`);
    console.log(`Mensagem: ${messageText}`);

    // --- SIMULAÇÃO DE ENVIO VIA API ---
    // Aqui você faria a chamada POST para sua API, enviando selectedRowKeys e messageText
    setTimeout(() => {
        message.success(`Mensagem (simulada) enviada para ${selectedRowKeys.length} usuário(s)!`);
        setMessageText(''); // Limpa a caixa de texto
        setSelectedRowKeys([]); // Limpa a seleção
        setLoading(false); // <<< Parar loading aqui
    }, 1500);
    // ---------------------------------
  };
  // --- Fim Lógica de Envio ---


  // --- Renderização ---
  return (
    <div className="mensagens-page">
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Mensagens em Massa</Title>

      {/* Card de Filtros e Ações (Idêntico ao original) */}
      <Card className="mensagens-card" style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} justify="space-between" align="bottom">
          {/* Filtro Dropdown por Plano */}
          <Col xs={24} sm={12} md={8} lg={6}>
             <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Filtrar por Plano</Text>
             <Select value={filteredPlan} onChange={setFilteredPlan} style={{ width: '100%' }}>
                 <Option value="all">Todos os Planos</Option>
                 <Option value="Free">Free/Trial</Option>
                 <Option value="Basic">Basic</Option>
                 <Option value="Premium">Premium</Option>
            </Select>
          </Col>
          {/* Botões de Seleção Rápida */}
          <Col xs={24} sm={24} md={16} lg={18}>
             <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Seleção Rápida</Text>
             <Space wrap style={{ marginTop: '8px' }}>
                 <Button onClick={() => handleSelectByPlan('Free')} size="small" disabled={loading}>Todos Free/Trial</Button>
                 <Button onClick={() => handleSelectByPlan('Basic')} size="small" disabled={loading}>Todos Basic</Button>
                 <Button onClick={() => handleSelectByPlan('Premium')} size="small" disabled={loading}>Todos Premium</Button>
                 <Button danger onClick={handleSelectExpiredFree} size="small" disabled={loading || usuariosExpirados.free.length === 0}>Free Expirados ({usuariosExpirados.free.length})</Button>
                 <Button danger onClick={handleSelectExpiredPaid} size="small" disabled={loading || usuariosExpirados.paid.length === 0}>Pagos Expirados ({usuariosExpirados.paid.length})</Button>
                 <Button type="dashed" onClick={handleSelectAllVisible} size="small" disabled={loading}>Todos Visíveis</Button>
             </Space>
          </Col>
        </Row>
      </Card>

       {/* Alerta de Erro */}
       {error && (
         <Alert message="Erro ao Carregar Usuários" description={error} type="error" showIcon style={{ marginBottom: 16 }}/>
       )}

      {/* Feedback de Seleção (Idêntico) */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
             {hasSelected ? `Selecionado(s): ${selectedRowKeys.length}` : 'Nenhum usuário selecionado'}
        </span>
         {hasSelected && ( <Button onClick={handleClearSelection} size="small" type="link" danger> Limpar Seleção </Button> )}
      </div>

      {/* Tabela */}
      <Table
        rowSelection={rowSelection} // Habilita seleção de linhas
        columns={columns}
        dataSource={filteredTableData} // Usa os dados filtrados client-side
        rowKey="id"
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }} // Estado de loading
        // Paginação interna como no original (opera sobre filteredTableData)
        pagination={{
            pageSize: 10,
            showSizeChanger: false, // Ou true se quiser permitir alterar
            style: { marginTop: 24, textAlign: 'right' }
        }}
        scroll={{ x: 'max-content', y: 'calc(100vh - 550px)' }} // Ajuste altura do scroll se necessário
        className="mensagens-table"
        size="small"
        locale={{ emptyText: loading ? 'Carregando...' : 'Nenhum usuário encontrado com os filtros aplicados' }}
      />

      {/* Área de Mensagem e Envio (Idêntica) */}
      <Divider style={{ borderColor: '#444' }} />
      <div className="message-area" style={{ marginTop: '16px' }}>
          <Title level={4} style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              Enviar Mensagem para {selectedRowKeys.length} usuário(s) selecionado(s)
         </Title>
          <TextArea
             rows={4}
             placeholder={hasSelected ? "Digite sua mensagem aqui..." : "Selecione usuários na tabela acima para enviar uma mensagem."}
             value={messageText}
             onChange={(e) => setMessageText(e.target.value)}
             disabled={!hasSelected || loading} // Desabilita se não houver seleção ou estiver enviando
             maxLength={500} // Limite de caracteres
             showCount // Mostra contador
             className="message-textarea"
         />
          <Button
            type="primary"
            style={{ marginTop: '16px' }}
            disabled={!canSendMessage || loading} // Desabilita se não puder enviar ou estiver enviando
            onClick={handleSendMessage}
            className="send-button"
            loading={loading} // Mostra loading no botão ao enviar
         >
            {loading ? 'Enviando...' : 'Enviar via WhatsApp (Simulado)'}
         </Button>
      </div>
    </div>
  );
};
export default Mensagens;