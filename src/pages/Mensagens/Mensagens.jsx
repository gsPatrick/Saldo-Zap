// src/pages/Mensagens/Mensagens.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Tag, Select, Space, Typography, Button, Card, Tooltip, Row, Col, Input, Divider, Spin, Alert, message, Pagination } from 'antd';
import { CheckSquareOutlined, BorderOutlined, LoadingOutlined } from '@ant-design/icons';

import './Mensagens.css'; // Estilos

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

// --- Configurações da API ---
const API_URL = 'https://smart-api.ftslwl.easypanel.host';
// <<< IMPORTANTE: Substitua pela sua chave de API REAL do SEU Backend >>>
const BACKEND_API_KEY = 'Fb60f69a4625b40b9a67f7083974da62cS';
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
  const [loading, setLoading] = useState(true);      // Loading da tabela inicial
  const [sending, setSending] = useState(false);     // Loading do envio de mensagens
  const [error, setError] = useState(null);
  const [filteredPlan, setFilteredPlan] = useState('all'); // Filtro de plano selecionado
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Chaves (IDs) das linhas selecionadas
  const [messageText, setMessageText] = useState(''); // Texto da mensagem a ser enviada
  // -----------------

  // --- Função para buscar TODOS os usuários da API ---
  const fetchAllUsers = useCallback(async () => {
    setLoading(true); // Ativa loading da tabela
    setError(null);
    console.log("Buscando TODOS os usuários para Mensagens...");
    try {
      const response = await fetch(`${API_URL}/api/v1/usuarios/allUsers`, { // Tenta buscar limite alto
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': BACKEND_API_KEY // <<< USA API KEY DO BACKEND
        },
      });
      if (!response.ok) {
          let errorMsg = `Erro ${response.status}`;
          try { const errData = await response.json(); errorMsg = errData.error || errData.message || errorMsg; } catch (e) {}
          throw new Error(errorMsg);
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

    } catch (err) {
        console.error("Erro ao buscar usuários para Mensagens:", err);
        setError(err.message || "Falha ao carregar lista de contas.");
        setAllUserData([]);
    } finally {
        setLoading(false); // Desativa loading da tabela
    }
  }, [BACKEND_API_KEY]); // Dependência da chave da API

  // --- useEffect para buscar dados ao montar ---
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]); // Depende da função fetchAllUsers (que depende da API_KEY)

  // --- Lógica de Filtro e Cálculo (CLIENT-SIDE) ---
  // Calcula usuários expirados
  const usuariosExpirados = useMemo(() => {
    const expirados = { free: [], paid: [] };
    allUserData.forEach(user => {
      if (user.plano === 'Free' && (user.diasRestantes === 0 || user.statusOriginal === 'expirado')) {
          expirados.free.push(user.id);
      }
      else if (user.plano !== 'Free' && (isPaidPlanExpired(user.expiracao) || user.statusOriginal === 'expirado')) {
          expirados.paid.push(user.id);
      }
    });
    return expirados;
  }, [allUserData]);

  // Filtra dados da tabela para exibição baseado no select de plano
  const filteredTableData = useMemo(() => {
    let data = allUserData;
    if (filteredPlan !== 'all') {
        data = data.filter((user) => user.plano === filteredPlan);
    }
    // O filtro por 'Status' é aplicado diretamente na definição da coluna pela UI da tabela
    return data;
  }, [allUserData, filteredPlan]);
  // --- Fim Filtro e Cálculo ---

  // --- Configuração da Seleção de Linhas ---
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys), // Atualiza estado com IDs selecionados
  };

  // --- Funções de Seleção em Massa ---
  const handleSelectByPlan = (plan) => { const keys = allUserData.filter(user => user.plano === plan).map(user => user.id); setSelectedRowKeys(keys); };
  const handleSelectExpiredFree = () => { setSelectedRowKeys(usuariosExpirados.free); };
  const handleSelectExpiredPaid = () => { setSelectedRowKeys(usuariosExpirados.paid); };
  const handleSelectAllVisible = () => { const keys = filteredTableData.map(user => user.id); setSelectedRowKeys(keys); };
  const handleClearSelection = () => { setSelectedRowKeys([]); };
  // --- Fim Funções de Seleção ---

  // --- Colunas da Tabela ---
   const columns = useMemo(() => [
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => (a.nome || '').localeCompare(b.nome || '') },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Plano', dataIndex: 'plano', key: 'plano', width: 120, align: 'center', render: (plano) => (<Tag color={getPlanTagColor(plano)} key={plano}>{plano ? String(plano).toUpperCase() : ''}</Tag>), },
    { title: 'Status', key: 'status', width: 120, align: 'center',
      render: (_, record) => { const isExpired = record.statusOriginal === 'expirado'; return <Tag color={isExpired ? "red" : "green"}>{isExpired ? 'Expirado' : 'Ativo'}</Tag>; },
      filters: [ { text: 'Ativo', value: 'ativo' }, { text: 'Expirado', value: 'expirado' } ],
      onFilter: (value, record) => record.statusOriginal === value, // Filtro da coluna
    },
  ], []);
  // --- Fim Colunas ---

  // --- Lógica de Envio ---
  const hasSelected = selectedRowKeys.length > 0;
  const canSendMessage = hasSelected && messageText.trim().length > 0;

  // <<< FUNÇÃO DE ENVIO INTEGRADA COM BACKEND >>>
  const handleSendMessage = async () => {
    if (!canSendMessage) return;
    setSending(true); // Ativa loading do botão
    setError(null);
    console.log(`[Frontend] Iniciando envio para ${selectedRowKeys.length} usuários via Backend.`);

    try {
        // Chamada POST para o endpoint do SEU backend
        const response = await fetch(`${API_URL}/api/v1/auth/send-bulk-message`, { // <<< ENDPOINT DO BACKEND
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': BACKEND_API_KEY // <<< Autenticação do SEU backend
            },
            body: JSON.stringify({
                userIds: selectedRowKeys, // Envia o array de IDs
                message: messageText      // Envia o texto da mensagem
            })
        });

        const result = await response.json(); // Tenta parsear a resposta do backend

        if (!response.ok) {
            // Se o backend retornou erro
            throw new Error(result.error || `Erro ${response.status} do servidor ao enviar mensagens.`);
        }

        // Se o backend retornou sucesso
        console.log('[Frontend] Resposta do Backend:', result);
        message.success(result.message || `Processo de envio iniciado com sucesso!`); // Mensagem vinda do backend

        // Exibe detalhes de falhas (se o backend retornar)
        if (result.details?.failedCount > 0) {
            message.warning(`${result.details.failedCount} mensagem(ns) podem ter falhado (verificar logs).`);
            console.warn("Erros detalhados (se houver):", result.details.errors);
        }

        // Limpa campos após SUCESSO
        setMessageText('');
        setSelectedRowKeys([]);

    } catch (err) {
        console.error("[Frontend] Erro ao chamar API de envio em massa:", err);
        setError(err.message || "Falha ao conectar com a API de envio."); // Define erro geral
        message.error(err.message || "Falha ao iniciar o envio das mensagens."); // Mostra erro para usuário
    } finally {
        setSending(false); // Desativa loading do botão
    }
  };
  // <<< FIM FUNÇÃO DE ENVIO >>>


  // --- Renderização ---
  return (
    <div className="mensagens-page">
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Mensagens em Massa</Title>

      {/* Card de Filtros e Ações */}
      <Card className="mensagens-card" style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} justify="space-between" align="bottom">
          <Col xs={24} sm={12} md={8} lg={6}>
             <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Filtrar por Plano</Text>
             <Select
                value={filteredPlan}
                onChange={setFilteredPlan} // Atualiza estado do filtro
                style={{ width: '100%' }}
                disabled={loading || sending} // Desabilita durante carregamentos/envio
            >
                 <Option value="all">Todos os Planos</Option>
                 <Option value="Free">Free/Trial</Option>
                 <Option value="Basic">Basic</Option>
                 <Option value="Premium">Premium</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18}>
             <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Seleção Rápida</Text>
             <Space wrap style={{ marginTop: '8px' }}>
                 {/* Desabilita botões durante carregamento/envio */}
                 <Button onClick={() => handleSelectByPlan('Free')} size="small" disabled={loading || sending}>Todos Free/Trial</Button>
                 <Button onClick={() => handleSelectByPlan('Basic')} size="small" disabled={loading || sending}>Todos Basic</Button>
                 <Button onClick={() => handleSelectByPlan('Premium')} size="small" disabled={loading || sending}>Todos Premium</Button>
                 <Button danger onClick={handleSelectExpiredFree} size="small" disabled={loading || sending || usuariosExpirados.free.length === 0}>Free Expirados ({usuariosExpirados.free.length})</Button>
                 <Button danger onClick={handleSelectExpiredPaid} size="small" disabled={loading || sending || usuariosExpirados.paid.length === 0}>Pagos Expirados ({usuariosExpirados.paid.length})</Button>
                 <Button type="dashed" onClick={handleSelectAllVisible} size="small" disabled={loading || sending}>Todos Visíveis</Button>
             </Space>
          </Col>
        </Row>
      </Card>

       {/* Alerta de Erro */}
       {error && (
         <Alert message="Erro" description={error} type="error" showIcon closable onClose={() => setError(null)} style={{ marginBottom: 16 }}/>
       )}

      {/* Feedback de Seleção */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
             {hasSelected ? `Selecionado(s): ${selectedRowKeys.length}` : 'Nenhum usuário selecionado'}
        </span>
         {/* Desabilita se enviando */}
         {hasSelected && ( <Button onClick={handleClearSelection} size="small" type="link" danger disabled={sending}> Limpar Seleção </Button> )}
      </div>

      {/* Tabela */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredTableData} // Usa os dados filtrados client-side
        rowKey="id"
        loading={{ spinning: loading, indicator: <LoadingOutlined spin /> }} // Loading inicial da tabela
        pagination={{ // Paginação interna AntD
            pageSize: 10,
            showSizeChanger: false, // Como no original
            style: { marginTop: 24, textAlign: 'right' }
            // showTotal não é necessário aqui, tabela mostra total filtrado
        }}
        scroll={{ x: 'max-content', y: 'calc(100vh - 580px)' }} // Ajuste altura
        className="mensagens-table"
        size="small"
        locale={{ emptyText: loading ? 'Carregando...' : 'Nenhum usuário encontrado' }}
      />

      {/* Área de Mensagem e Envio */}
      <Divider style={{ borderColor: '#444' }} />
      <div className="message-area" style={{ marginTop: '16px' }}>
          <Title level={4} style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              Enviar Mensagem para {selectedRowKeys.length} usuário(s) selecionado(s)
         </Title>
          <TextArea
             rows={4}
             placeholder={hasSelected ? "Digite sua mensagem aqui..." : "Selecione usuários na tabela acima."}
             value={messageText}
             onChange={(e) => setMessageText(e.target.value)}
             disabled={!hasSelected || loading || sending} // Desabilitado se carregando ou enviando
             maxLength={500}
             showCount
             className="message-textarea"
         />
          <Button
            type="primary"
            style={{ marginTop: '16px' }}
            disabled={!canSendMessage || loading || sending} // Desabilitado se não pode ou está carregando/enviando
            onClick={handleSendMessage} // <<< Chama a função integrada >>>
            className="send-button"
            loading={sending} // <<< Usa o estado 'sending' >>>
         >
            {sending ? 'Enviando...' : 'Enviar Mensagem em Massa'} {/* Texto dinâmico */}
         </Button>
      </div>
    </div>
  );
};
export default Mensagens;