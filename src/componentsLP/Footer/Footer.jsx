// src/componentsLP/FooterLP.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Importa Ícones do Ant Design E do React Icons
import { MailOutlined, WhatsAppOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { FaTiktok } from 'react-icons/fa'; // <<< IMPORTANDO ÍCONE DO TIKTOK
import './Footer.css'; // Certifique-se que o nome do arquivo CSS está correto

// Componente TikTokIcon removido (não precisamos mais dele)

const FooterLP = () => {
  const currentYear = new Date().getFullYear();
  const portfolioUrl = "https://patrick-siqueira-portifolio.vercel.app/";
  const logoUrl = "https://i.imgur.com/DVNkfll.png";
  // --- LINKS ---
  const whatsappContactNumber = "55119XXXXXXXX";
  const contactEmail = "contato@saldozap.com";
  const instagramUrl = "https://www.instagram.com/saldo_zap/?igsh=dG16ejFoZzd4dTlk&utm_source=qr";
  const tiktokUrl = "https://www.tiktok.com/@user24207358690054?is_from_webapp=1&sender_device=pc";
  const youtubeUrl = "https://www.youtube.com/@Saldo.Zap401";
  // --- FIM LINKS ---

  return (
    <footer className="lp-footer-component">
      {/* Seção Principal com Colunas */}
      <div className="lp-footer-main-content">
        {/* Coluna 1: Logo, Descrição, Social, Créditos Dev */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-logo-container" aria-label="Página Inicial Saldo Zap">
             <img src={logoUrl} alt="Saldo Zap Logo" className="footer-logo" />
             <span className="footer-logo-text">Saldo Zap</span>
          </Link>
          <p className="footer-description">
            Transformando sua gestão financeira pessoal com inteligência artificial e a simplicidade do WhatsApp.
          </p>
          {/* --- ÍCONES SOCIAIS USANDO ANT DESIGN E REACT ICONS --- */}
          <div className="footer-social-icons">
            {/* Ícone Ant Design */}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramOutlined /></a>
            {/* Ícone React Icons */}
            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok /> {/* <<< USA O ÍCONE IMPORTADO */}
            </a>
             {/* Ícone Ant Design */}
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YoutubeOutlined /></a>
          </div>
          {/* --- FIM ÍCONES SOCIAIS --- */}
           <div className="developer-credit-main">
             {/* ... créditos dev ... */}
              <span className="dev-text">Desenvolvido com</span>
              <span className="heart-icon">❤️</span>
              <span className="dev-text">por</span>
              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="developer-link">Patrick.Developer</a>
           </div>
        </div>

        {/* Coluna 2: Navegação Principal */}
        <div className="footer-col footer-links-col">
            {/* ... links navegação ... */}
             <h4 className="footer-col-title">Navegação</h4>
             <ul>
                <li><Link to="/funcionalidades">Funcionalidades</Link></li>
                <li><Link to="/planos">Planos</Link></li>
                <li><Link to="/seguranca">Segurança</Link></li>
                <li><Link to="/faq">Perguntas Frequentes</Link></li>
                <li><Link to="/termos-de-uso">Termos de Uso</Link></li>
              
             </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className="footer-col footer-contact-col">
           {/* ... links contato ... */}
            <h4 className="footer-col-title">Contato</h4>
            <ul>
                <li><a href={`mailto:${contactEmail}`}><MailOutlined /> <span>{contactEmail}</span></a></li>
                <li><a href={`https://wa.me/${whatsappContactNumber}?text=Ol%C3%A1%21+Tenho+uma+d%C3%BAvida+sobre+o+Saldo+Zap.`} target="_blank" rel="noopener noreferrer"><WhatsAppOutlined /> <span>WhatsApp Suporte</span></a></li>
            </ul>
        </div>
      </div>

      {/* Linha Divisória */}
      <hr className="footer-divider" />

      {/* Barra Inferior */}
      <div className="lp-footer-bottom-bar">
        <p className="copyright-text">
          © {currentYear} Saldo Zap. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterLP;