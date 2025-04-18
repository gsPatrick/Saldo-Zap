// src/App.jsx
import React from 'react'; // Removido useState se não usado diretamente aqui
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

// --- Importações das Páginas ---
import LandingPage from './pages/LandingPage/LandingPage';
import LpPlanes from './pages/LpPlanes/LpPlanes';
import SignupPage from './pages/SignupPage/SignupPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import AwaitingPaymentPage from './pages/AwaitingPaymentPage/AwaitingPaymentPage';
import FaqPage from './pages/FaqPage/FaqPage';
import FeaturesPage from './pages/FeaturesPage/FeaturesPage';
import SecurityPage from './pages/SecurityPage/SecurityPage';
import LoginPage from './pages/LoginPage/LoginPage'; // <<< IMPORTAR LOGIN PAGE
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage'; // <<< IMPORTAR CONFIRMATION PAGE
import AccountDetailsPage from './pages/AccountDetailsPage/AccountDetailsPage';
import UserActivationPage from './pages/UserActivationPage/UserActivationPage';

// --- Componentes e Páginas do Dashboard Interno ---
import Sidebar from './components/Sidebar/Sidebar'; // Importação para DashboardLayout
import Dashboard from './pages/Dashboard/Dashboard';
import Contas from './pages/Contas/Contas';
import Mensagens from './pages/Mensagens/Mensagens';

// --- Importa o novo Componente ---
import ScrollToTop from './components/Scroll/ScrollToTop'; // <<< IMPORTAR

// Estilos Globais
import './index.css';

const { Content } = Layout;

// --- Layout Específico para o Dashboard ---
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false); // Adicionado React.useState
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="site-layout">
        <Content style={{ padding: 24, margin: 0, background: '#1a1a1a', minHeight: 280, width: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};


// --- Componente Principal App (Gerenciador de Rotas) ---
function App() {
  return (
    // Usamos Fragment <> para agrupar ScrollToTop e Routes sem adicionar div extra
    <>
      <ScrollToTop /> {/* <<< ADICIONAR O COMPONENTE AQUI */}
      <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/planos" element={<LpPlanes />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route path="/awaiting-payment" element={<AwaitingPaymentPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/funcionalidades" element={<FeaturesPage />} />
        <Route path="/seguranca" element={<SecurityPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* <<< NOVA ROTA LOGIN */}
        <Route path="/confirmacao" element={<ConfirmationPage />} /> {/* <<< NOVA ROTA */}
        <Route path="/conta" element={<AccountDetailsPage />} /> {/* <<< ROTA CONTA DETALHES */}
        <Route path="/usuarioLogin" element={<UserActivationPage />} /> {/* <<< ROTA CONTA DETALHES */}


        {/* <Route path="/termos" element={<TermsPage />} /> */}
        {/* <Route path="/privacidade" element={<PrivacyPage />} /> */}

        {/* --- Rotas Protegidas / Internas --- */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contas" element={<Contas />} />
          <Route path="/mensagens" element={<Mensagens />} />
        </Route>

        {/* --- Rota Catch-all --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;