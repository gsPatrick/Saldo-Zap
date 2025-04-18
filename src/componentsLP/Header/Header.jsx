// src/componentsLP/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './Header.css';

const logoUrl = "https://i.imgur.com/DVNkfll.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Hook para obter a localização atual

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Verifica se estamos na página principal (/)
  const isHomePage = location.pathname === '/';

  return (
    <header className="lp-header">
      {/* Link na logo para voltar para a Home */}
      <Link to="/" className="lp-logo-container" onClick={closeMenu}>
        <img src={logoUrl} alt="Smart-Custo Logo" className="lp-logo-img" />
        <span className="lp-logo-text">Saldo Zap</span>
      </Link>

      {/* Navegação Desktop */}
      <nav className="lp-nav-actions">
        {/* Link para Home/Início - Só aparece se NÃO estivermos na Home */}
        {!isHomePage && (
            <NavLink
                to="/"
                className={({ isActive }) => "lp-nav-link" + (isActive ? " active" : "")}
            >
                Início
            </NavLink>
        )}
        {/* Link para seção Funcionalidades (se estiver na Home) */}
        {isHomePage && (
             <a href="funcionalidades" className="lp-nav-link" onClick={closeMenu}>Funcionalidades</a>
          
        )}

        <NavLink
            to="/planos"
            className={({ isActive }) => "lp-nav-link" + (isActive ? " active" : "")}
        >
            Planos
        </NavLink>
        <NavLink
            to="/faq"
            className={({ isActive }) => "lp-nav-link" + (isActive ? " active" : "")}
        >
            Perguntas Frequentes
        </NavLink>
        {/* BOTÃO/LINK "ACESSAR PAINEL" REMOVIDO */}
        {/* <Link to="/dashboard" className="lp-cta-button">Acessar Painel</Link> */}

        {/* Adicionando botão "Começar Agora" que leva para Planos ou Signup */}
         <Link to="/planos" className="lp-cta-button">
          Começar Agora
        </Link>
      </nav>

      {/* Botão Hamburger para Mobile */}
      <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
         {/* Link para Home/Início - Só aparece se NÃO estivermos na Home */}
         {!isHomePage && (
            <NavLink to="/" className={({ isActive }) => "mobile-nav-link" + (isActive ? " active" : "")} onClick={closeMenu}>Início</NavLink>
         )}
         {/* Link para seção Funcionalidades (se estiver na Home) */}
         {isHomePage && (
            <a href="#funcionalidades-section" className="mobile-nav-link" onClick={closeMenu}>Funcionalidades</a>
         )}
        <NavLink to="/planos" className={({ isActive }) => "mobile-nav-link" + (isActive ? " active" : "")} onClick={closeMenu}>Planos</NavLink>
        <NavLink to="/faq" className={({ isActive }) => "mobile-nav-link" + (isActive ? " active" : "")} onClick={closeMenu}>FAQ</NavLink>
         {/* BOTÃO/LINK "ACESSAR PAINEL" REMOVIDO DO MENU MOBILE */}
        {/* <Link to="/dashboard" className="mobile-cta-button" onClick={closeMenu}>Acessar Painel</Link> */}

         {/* Botão CTA Mobile */}
         <Link to="/planos" className="mobile-cta-button" onClick={closeMenu}>Começar Agora</Link>
      </div>
    </header>
  );
};

export default Header;