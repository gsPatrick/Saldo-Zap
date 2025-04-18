// src/pages/Contas/Contas.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Adicionar useCallback
import { Table, Tag, Input, Checkbox, Space, Typography, Tooltip, Card, Row, Col, Spin, Alert, message, Pagination } from 'antd'; // Adicionar Spin, Alert, message, Pagination
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce'; // Importar debounce do lodash
import './Contas.css';

const { Search } = Input;
const { Text, Title } = Typography;

// --- Definir URL da API e API Key ---
const API_URL = process.env.REACT_APP_API_URL || 'https://smart-api.ftslwl.easypanel.host';
const API_KEY = process.env.REACT_APP_INTERNAL_API_KEY || 'SUA_API_KEY_AQUI'; // <<< COLOQUE SUA API KEY REAL

// --- Funções Helper ---
const getPlanTagColor = (plano) => {
    if (!plano) return 'default';
    const lowerPlano = plano.toLowerCase();
    if (lowerPlano.includes('free') || lowerPlano.includes('trial')) return 'default';
    if (lowerPlano.includes('basic')) return 'blue';
    if (lowerPlano.includes('premium')) return '#56935c'; // Verde
    return 'default';
};

// Opções de Plano para filtro (pode ser dinâmico no futuro)
const planOptions = [
  { label: 'Free', value: 'Free' }, // Usar valor exato ou padrão do DB
  { label: 'Basic', value: 'Basic' }, // Ajustar valor se o nome no DB for diferente
  { label: 'Premium', value: 'Premium' }, // Ajustar valor
  // Adicione 'Trial' se quiser filtrar por trial especificamente
];

// --- Componente ---
const Contas = () => {
  // --- Estados ---
  const [userData, setUserData] = useState([]); // Dados da página atual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filtros e Paginação
  const [searchText, setSearchText] = useState('');
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Ou o default da sua API
  const [totalUsers, setTotalUsers] = useState(0); // Total de usuários para paginação

  // --- Função para buscar dados da API com filtros e paginação ---
  const fetchUsers = useCallback(async (page = 1, limit = 10, search = '', plans = []) => {
    setLoading(true);
    setError(null);
    console.log(`Buscando usuários: Pag=${page}, Lim=${limit}, Search='${search}', Plans=[${plans.join(',')}]`);

    // Monta Query String
    const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    if (search) query.set('search', search);
    // Enviar múltiplos planos como parâmetro repetido ou separado por vírgula?
    // Vamos assumir que a API aceita separado por vírgula por simplicidade aqui.
    // Se a API espera ?plan=Basic&plan=Premium, ajuste a lógica.
    if (plans.length > 0) query.set('plan', plans.join(',')); // Ex: ?plan=Basic,Premium

    try {
      const response = await fetch(`${API_URL}/api/v1/usuarios/allUsers?${query.toString()}`, { // <<< Usar endpoint /usuarios
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
      });

      if (!response.ok) {
        let errorMsg = `Erro ${response.status}`;
        try { const errData = await response.json(); errorMsg = errData.error || errorMsg; } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("Usuários recebidos:", data);

      // Formatar os dados recebidos
      const formattedData = (data.users || []).map(user => {
            let diasRestantes = null;
            let expiracaoFormatada = null;
            let planoReal = user.plano || 'Free';

            // Calcula dias restantes do trial
             if (!user.assinatura_ativa && user.trial_fim) {
                 const trialEnd = new Date(user.trial_fim);
                 const hoje = new Date();
                 if (!isNaN(trialEnd.getTime())) {
                    const diff = Math.ceil((trialEnd.setHours(12,0,0,0) - hoje.setHours(12,0,0,0)) / (1000 * 60 * 60 * 24));
                    diasRestantes = diff < 0 ? 0 : diff;
                 }
                 planoReal = `Free (Trial ${diasRestantes ?? '?'}d)`; // Indica trial
             }
             // Formata data de expiração da assinatura
             else if (user.assinatura_ativa && user.assinatura_expira_em) {
                 const expDate = new Date(user.assinatura_expira_em);
                 if (!isNaN(expDate.getTime())) {
                     expiracaoFormatada = expDate.toISOString().split('T')[0];
                 }
             } else if (!user.assinatura_ativa) { // Garante Free se não tem nada
                planoReal = 'Free';
             } else if (user.assinatura_ativa && !user.plano) { // Caso estranho
                 planoReal = 'Pago'; // Ou 'Pago (Desconhecido)'
             }

            return {
                id: user.id_usuario,
                email: user.email || '-',
                nome: user.nome || '-',
                plano: planoReal, // Nome formatado com trial
                planoBase: user.plano || 'Free', // Nome base para filtro
                expiracao: expiracaoFormatada,
                diasRestantes: diasRestantes,
                telefone: user.telefone // Incluir telefone se precisar exibir/usar
            };
        });

      setUserData(formattedData); // Atualiza dados da tabela (página atual)
      setTotalUsers(data.total || 0); // Atualiza contagem total para paginação
      setCurrentPage(data.currentPage || page); // Atualiza página atual (vindo da API)

    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError(err.message || "Falha ao carregar lista de contas.");
      setUserData([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // useCallback para evitar recriação desnecessária

  // --- useEffect para buscar dados ao montar e quando filtros/página mudam ---
  useEffect(() => {
    // Chama fetchUsers com os estados atuais de filtro e paginação
    // Usar debounce aqui para a busca de texto seria ideal para não chamar a API a cada letra digitada
    fetchUsers(currentPage, pageSize, searchText, selectedPlans);
  }, [currentPage, pageSize, searchText, selectedPlans, fetchUsers]); // Dependências

  // --- Handler Debounced para Busca (Opcional, mas recomendado) ---
  // Instalar lodash: npm install lodash.debounce
  const debouncedSearch = useCallback(
     debounce((value) => {
         setCurrentPage(1); // Volta para a primeira página ao buscar
         setSearchText(value);
     }, 500), // Espera 500ms após usuário parar de digitar
     [] // Sem dependências para o debounce em si
  );

  const handleSearchChange = (e) => {
     debouncedSearch(e.target.value);
  };
  // --- Fim do Debounce ---

  // --- Handler para Mudança de Página ---
   const handlePageChange = (page, size) => {
     setCurrentPage(page);
     // Se o tamanho da página mudou, pode ser necessário reajustar
     if (size !== pageSize) {
        setPageSize(size); // Atualiza tamanho da página no estado
     }
     // O useEffect vai disparar a busca com a nova página/tamanho
   };

    // --- Handler para Mudança de Filtro de Plano ---
    const handlePlanFilterChange = (checkedValues) => {
        setCurrentPage(1); // Volta para a primeira página ao filtrar
        setSelectedPlans(checkedValues);
        // O useEffect vai disparar a busca com os novos planos
    };


  // --- Colunas da Tabela (Ajustadas para usar dados formatados) ---
   const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email', sorter: (a, b) => (a.email || '').localeCompare(b.email || ''), width: 250, ellipsis: true },
    { title: 'Nome', dataIndex: 'nome', key: 'nome', sorter: (a, b) => (a.nome || '').localeCompare(b.nome || ''), width: 200, ellipsis: true },
    // { title: 'Telefone', dataIndex: 'telefone', key: 'telefone', width: 150 }, // Descomente se quiser exibir
    {
      title: 'Plano', dataIndex: 'plano', key: 'plano', width: 150, align: 'center',
      render: (plano) => {
        const planNameOnly = String(plano).split(' ')[0];
        return <Tag color={getPlanTagColor(planNameOnly)} key={plano}>{plano ? String(plano).toUpperCase() : ''}</Tag>;
      }
    },
    {
      title: 'Expiração / Dias Trial', key: 'expiracao', align: 'center', width: 200,
      // Sorter pode precisar de ajuste fino se API não ordenar
      render: (text, record) => {
          if (String(record.plano).includes('Trial')) {
             const dias = record.diasRestantes;
             if (typeof dias === 'number') {
                 const style = dias <= 3 ? { color: '#f5222d', fontWeight: 'bold' } : {}; // Vermelho forte
                 return <span style={style}>{dias} dia(s) Trial</span>;
             }
          } else if (record.expiracao) {
             try {
               const date = new Date(record.expiracao + 'T12:00:00Z');
               if (isNaN(date.getTime())) return <Text type="danger">Inválida</Text>;
               const day = String(date.getDate()).padStart(2, '0');
               const month = String(date.getMonth() + 1).padStart(2, '0');
               const year = date.getFullYear();
               return <span style={{color: '#ccc'}}>{`${day}/${month}/${year}`}</span>;
             } catch (error) { return <Text type="danger">Erro</Text>; }
          }
          return <span style={{color: '#888'}}>-</span>;
       },
    },
    // Adicionar Coluna de Ações (Ex: Editar, Ver Detalhes) se necessário
    // {
    //   title: 'Ações',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Editar</a>
    //       <a>Excluir</a>
    //     </Space>
    //   ),
    // },
  ];

  // --- Renderização ---
  return (
    <>
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Gerenciamento de Contas</Title>

      <Card className="filter-card" style={{ marginBottom: '24px' }}>
         <Row gutter={[16, 16]} align="bottom">
            <Col xs={24} sm={24} md={10} lg={8} xl={6}>
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Buscar</Text>
                <Search
                    placeholder="Email ou Nome"
                    allowClear
                    // onSearch agora é tratado pelo debounce no onChange
                    onChange={handleSearchChange} // Usa handler com debounce
                    style={{ width: '100%' }}
                    enterButton // Mantém botão se desejar busca imediata com Enter
                />
            </Col>
             <Col xs={24} sm={24} md={14} lg={16} xl={18}>
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Filtrar por Plano</Text>
                <Checkbox.Group
                    options={planOptions} // Usa as opções definidas
                    value={selectedPlans}
                    onChange={handlePlanFilterChange} // Usa handler que reseta página
                    style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}
                />
             </Col>
         </Row>
      </Card>

      {error && ( // Mostra alerta de erro GERAL acima da tabela
         <Alert message="Erro ao Carregar Contas" description={error} type="error" showIcon style={{ marginBottom: 16 }}/>
      )}

      <Table
        columns={columns}
        dataSource={userData} // Dados da página atual vindo da API
        rowKey="id"
        loading={loading} // Mostra overlay de loading na tabela
        pagination={false} // Desabilitar paginação interna da tabela
        scroll={{ x: 'max-content' }}
        className="contas-table"
      />
       {/* Paginação Externa AntD */}
       {!loading && totalUsers > 0 && ( // Só mostra paginação se não estiver carregando e houver usuários
           <Pagination
               current={currentPage}
               pageSize={pageSize}
               total={totalUsers}
               onChange={handlePageChange} // Handler para mudar de página
               showSizeChanger={true} // Permite mudar qtd por página
               onShowSizeChange={handlePageChange} // Usa o mesmo handler para atualizar
               pageSizeOptions={[10, 20, 50, 100]} // Opções de tamanho
               style={{ marginTop: 24, textAlign: 'center' }}
               showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} contas`}
           />
       )}
    </>
  );
};

export default Contas;