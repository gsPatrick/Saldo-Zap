// src/pages/Contas/Contas.jsx
import React, { useState, useMemo } from 'react';
import { Table, Tag, Input, Checkbox, Space, Typography, Tooltip, Card, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './Contas.css'; // Estilos específicos

const { Search } = Input;
const { Text, Title } = Typography;

// --- Dados Mock (Substitua por dados reais da sua API/estado global) ---
const initialUserData = [
    { id: '1', email: 'usuario1@email.com', nome: 'Alice Silva', plano: 'Premium', expiracao: '2024-12-31', diasRestantes: null, },
    { id: '2', email: 'joao.souza@email.com', nome: 'João Souza', plano: 'Free', expiracao: null, diasRestantes: 7, },
    { id: '3', email: 'maria.pereira@email.com', nome: 'Maria Pereira', plano: 'Basic', expiracao: '2024-08-15', diasRestantes: null, },
    { id: '4', email: 'carlos.rodrigues@email.com', nome: 'Carlos Rodrigues', plano: 'Free', expiracao: null, diasRestantes: 0, },
    { id: '5', email: 'ana.costa@email.com', nome: 'Ana Costa', plano: 'Premium', expiracao: '2025-03-01', diasRestantes: null, },
    // Adicione mais dados mock se necessário
];
// --- Fim dos Dados Mock ---

// Mapeamento de cores para Tags de Plano
const getPlanTagColor = (plano) => {
   switch (plano) {
    case 'Free': return 'default'; // Cor padrão AntD (cinza)
    case 'Basic': return 'blue'; // Cor azul AntD
    case 'Premium': return '#56935c'; // Nossa cor verde padrão
    default: return 'default';
  }
};

// Opções de Plano para os filtros Checkbox
const planOptions = [
  { label: 'Free', value: 'Free' },
  { label: 'Basic', value: 'Basic' },
  { label: 'Premium', value: 'Premium' },
];

// Componente da página Contas
const Contas = () => {
  const [userData] = useState(initialUserData); // Dados da tabela
  const [searchText, setSearchText] = useState(''); // Texto da busca
  const [selectedPlans, setSelectedPlans] = useState([]); // Planos selecionados no filtro (array)

  // Definição das colunas da tabela (SEM SENHA)
  const columns = [
    {
      title: 'Email', // Título da coluna
      dataIndex: 'email', // Campo do objeto de dados a ser exibido
      key: 'email', // Chave única da coluna
      sorter: (a, b) => a.email.localeCompare(b.email), // Habilita ordenação alfabética
      width: 250, // Exemplo de largura fixa
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Habilita ordenação alfabética
      width: 200, // Exemplo de largura fixa
    },
    // COLUNA SENHA FOI REMOVIDA
    {
      title: 'Plano',
      dataIndex: 'plano',
      key: 'plano',
      // Renderização customizada para exibir a Tag colorida
      render: (plano) => (
        <Tag color={getPlanTagColor(plano)} key={plano}>
          {plano ? plano.toUpperCase() : ''} {/* Garante uppercase e trata valor nulo */}
        </Tag>
      ),
       width: 120, // Exemplo de largura fixa
       align: 'center',
    },
    {
      title: 'Expiração / Dias Restantes',
      key: 'expiracao', // Usamos key pois não há um dataIndex único para os dois casos
      align: 'center', // Alinha conteúdo no centro
      width: 200, // Exemplo de largura fixa
      // Ordenação customizada
      sorter: (a, b) => {
          const valA = a.plano === 'Free' ? (a.diasRestantes ?? -Infinity) : new Date(a.expiracao); // Trata dias nulos
          const valB = b.plano === 'Free' ? (b.diasRestantes ?? -Infinity) : new Date(b.expiracao); // Trata dias nulos
          const dateA = new Date(a.expiracao + 'T00:00:00');
          const dateB = new Date(b.expiracao + 'T00:00:00');

          // Lógica de ordenação: Free com dias > Free com 0 dias > Datas válidas (mais próximas primeiro) > Datas inválidas
          if (a.plano === 'Free' && b.plano !== 'Free') return -1;
          if (a.plano !== 'Free' && b.plano === 'Free') return 1;
          if (a.plano === 'Free' && b.plano === 'Free') return valB - valA; // Ordena dias descrescente

          // Ordena por data (datas inválidas ou não existentes vão para o final)
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          return dateA - dateB; // Ordena datas válidas (mais antigas primeiro)
       },
       // Renderização customizada para exibir dias ou data formatada
      render: (text, record) => {
          if (record.plano === 'Free') {
            const dias = record.diasRestantes;
            // Verifica se dias é um número antes de comparar
            if (typeof dias === 'number') {
                const style = dias === 0 ? { color: '#ff4d4f', fontWeight: 'bold' } : { color: '#ccc'}; // Vermelho AntD ou cinza
                return <span style={style}>{dias} dia(s)</span>;
            }
            return <span style={{color: '#888'}}>-</span>; // Retorno se dias não for número
          } else if (record.plano === 'Basic' || record.plano === 'Premium') {
            if (!record.expiracao) return <span style={{color: '#888'}}>-</span>; // Retorno se data de expiração não existir
            try {
              // Adiciona T00:00:00 para normalizar a data (evita problemas de fuso)
              const date = new Date(record.expiracao + 'T00:00:00');
              // Verifica se a data resultante é válida
              if (isNaN(date.getTime())) {
                  console.warn("Data inválida encontrada:", record.expiracao);
                  return <Text type="danger">Inválida</Text>;
              }
              // Formatação DD/MM/YYYY
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado
              const year = date.getFullYear();
              return <span style={{color: '#ccc'}}>{`${day}/${month}/${year}`}</span>;
            } catch (error) {
               console.error("Erro ao formatar data:", error, record.expiracao);
               return <Text type="danger">Erro</Text>;
            }
          }
          return <span style={{color: '#888'}}>-</span>; // Retorno padrão
       },
    },
  ];

  // Filtra os dados usando useMemo para otimização
  const filteredData = useMemo(() => {
    let data = userData;
    // Filtrar por texto de busca (case-insensitive)
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      data = data.filter(
        (item) =>
          (item.email && item.email.toLowerCase().includes(lowerSearchText)) ||
          (item.nome && item.nome.toLowerCase().includes(lowerSearchText))
      );
    }
    // Filtrar por planos selecionados (se a lista não estiver vazia)
    if (selectedPlans.length > 0) {
      data = data.filter((item) => item.plano && selectedPlans.includes(item.plano));
    }
    return data;
  }, [userData, searchText, selectedPlans]); // Recalcula quando estes mudarem

  // --- Renderização do Componente ---
  return (
    // Usa Fragment para evitar div externa desnecessária
    <>
      {/* Título da Página */}
      <Title level={2} style={{ color: '#FFFFFF', marginBottom: '24px' }}>Gerenciamento de Contas</Title>

      {/* --- Card com Filtros --- */}
      <Card className="filter-card" style={{ marginBottom: '24px' }}>
         <Row gutter={[16, 16]} align="bottom"> {/* Linha com espaçamento e alinhamento */}
            {/* Coluna da Barra de Busca */}
            <Col xs={24} sm={12} md={10} lg={8} xl={6}> {/* Coluna responsiva */}
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Buscar</Text>
                <Search
                    placeholder="Email ou Nome"
                    allowClear // Permite limpar a busca
                    onSearch={(value) => setSearchText(value)} // Busca ao pressionar Enter/ícone
                    // Limpa o estado se o usuário apagar o texto do input
                    onChange={(e) => !e.target.value && setSearchText('')}
                    style={{ width: '100%' }} // Ocupa largura da coluna
                    enterButton // Mostra botão de busca
                />
            </Col>

             {/* Coluna do Filtro de Plano */}
             <Col xs={24} sm={12} md={14} lg={16} xl={18}> {/* Coluna responsiva */}
                <Text strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '8px' }}>Filtrar por Plano</Text>
                <Checkbox.Group
                    options={planOptions} // Opções definidas acima
                    value={selectedPlans} // Valor controlado pelo estado
                    onChange={(checkedValues) => setSelectedPlans(checkedValues)} // Atualiza estado ao mudar
                    style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }} // Layout flexível
                />
             </Col>
             {/* Futuros filtros podem ser adicionados em novas <Col> aqui */}
         </Row>
      </Card>
      {/* --- Fim do Card de Filtros --- */}

      {/* Tabela AntD */}
      <Table
        columns={columns} // Colunas definidas acima
        dataSource={filteredData} // Dados filtrados
        rowKey="id" // Chave única de cada linha (do objeto de dados)
        pagination={{
            pageSize: 10, // Número de itens por página
            showSizeChanger: false, // Opcional: esconde opção de mudar tamanho da página
            // Estilos da paginação definidos no CSS
        }}
        scroll={{ x: 'max-content' }} // Habilita scroll horizontal se conteúdo exceder largura
        className="contas-table" // Classe para aplicar estilos CSS específicos
      />
    </>
  );
};

export default Contas; // Exporta o componente