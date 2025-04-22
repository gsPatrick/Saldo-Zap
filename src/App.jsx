// src/App.jsx
import React from 'react';
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
import LoginPage from './pages/LoginPage/LoginPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import AccountDetailsPage from './pages/AccountDetailsPage/AccountDetailsPage';
import UserActivationPage from './pages/UserActivationPage/UserActivationPage';

// --- Componentes e Páginas do Dashboard Interno ---
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Contas from './pages/Contas/Contas';
import Mensagens from './pages/Mensagens/Mensagens';

// --- Componentes Utilitários ---
import ScrollToTop from './components/Scroll/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // <<< IMPORTAR PROTECTED ROUTE

// Estilos Globais
import './index.css';

const { Content } = Layout;

// --- Layout Específico para o Dashboard ---
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="site-layout">
        <Content style={{ padding: 24, margin: 0, background: '#1a1a1a', minHeight: 280, width: 'auto' }}>
          {/* Outlet renders the specific dashboard page (Dashboard, Contas, Mensagens) */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};


// --- Componente Principal App (Gerenciador de Rotas) ---
function App() {
  return (
    <>
      <ScrollToTop />
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirmacao" element={<ConfirmationPage />} />
        <Route path="/conta" element={<AccountDetailsPage />} />
        <Route path="/usuarioLogin" element={<UserActivationPage />} />
        {/* <Route path="/termos" element={<TermsPage />} /> */}
        {/* <Route path="/privacidade" element={<PrivacyPage />} /> */}

        {/* --- Rotas Protegidas / Internas --- */}
        {/* Wrap the entire group of internal routes with ProtectedRoute */}
        <Route element={<ProtectedRoute />}> {/* Checks for token */}
          <Route element={<DashboardLayout />}> {/* If token exists, renders layout */}
            {/* These routes are only accessible if ProtectedRoute allows and are rendered inside DashboardLayout */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contas" element={<Contas />} />
            <Route path="/mensagens" element={<Mensagens />} />
            {/* Add any other future protected routes inside DashboardLayout here */}
          </Route>
          {/* You could add other protected routes *outside* DashboardLayout here if needed */}
          {/* e.g., <Route path="/admin-settings" element={<AdminSettings />} /> */}
        </Route>

        {/* --- Rota Catch-all --- */}
        {/* Redirects any unmatched URL to the root page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;