// src/componentsLP/FooterLP.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, WhatsAppOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import './Footer.css'; // <<< Certifique-se que o nome do arquivo CSS é FooterLP.css

const FooterLP = () => {
  const currentYear = new Date().getFullYear();
  const portfolioUrl = "https://patrick-siqueira-portifolio.vercel.app/";
  const logoUrl = "https://i.imgur.com/DVNkfll.png";
  // <<< SUBSTITUA PELOS SEUS DADOS REAIS >>>
  const whatsappContactNumber = "55119XXXXXXXX";
  const contactEmail = "contato@SaldoZap.com";
  const facebookUrl = "#";
  const instagramUrl = "#";
  const linkedinUrl = "#";
  // <<< FIM SUBSTITUIÇÕES >>>

  return (
    <footer className="lp-footer-component">
      {/* Seção Principal com Colunas */}
      <div className="lp-footer-main-content">
        {/* Coluna 1: Logo+Nome, Descrição, Social, Créditos Dev */}
        <div className="footer-col footer-brand-col">
          {/* Container da Logo e Texto agora é um Link */}
          <Link to="/" className="footer-logo-container" aria-label="Página Inicial Saldo Zap">
             <img src={logoUrl} alt="Smart-Custo Logo" className="footer-logo" />
             <span className="footer-logo-text">Saldo Zap</span> {/* Nome ao lado */}
          </Link>
          <p className="footer-description">
            Transformando sua gestão financeira pessoal com inteligência artificial e a simplicidade do WhatsApp.
          </p>
          <div className="footer-social-icons">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookOutlined /></a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramOutlined /></a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinOutlined /></a>
          </div>
           {/* >>> CRÉDITOS DO DESENVOLVEDOR MOVIDOS PARA CÁ <<< */}
           <div className="developer-credit-main"> {/* Nova classe para estilização */}
            <span className="dev-text">Desenvolvido com</span>
            <span className="heart-icon">❤️</span>
            <span className="dev-text">por</span>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              Patrick.Developer
            </a>
          </div>
           {/* >>> FIM CRÉDITOS MOVIDOS <<< */}
        </div>

        {/* Coluna 2: Navegação Principal */}
        <div className="footer-col footer-links-col">
          <h4 className="footer-col-title">Navegação</h4>
          <ul>
            <li><Link to="/funcionalidades">Funcionalidades</Link></li>
            <li><Link to="/planos">Planos</Link></li>
            <li><Link to="/seguranca">Segurança</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div className="footer-col footer-contact-col">
          <h4 className="footer-col-title">Contato</h4>
          <ul>
            <li>
              <a href={`mailto:${contactEmail}`}>
                <MailOutlined /> <span>{contactEmail}</span>
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${whatsappContactNumber}?text=Ol%C3%A1%21+Tenho+uma+d%C3%BAvida+sobre+o+Saldo+Zap.`} target="_blank" rel="noopener noreferrer">
                <WhatsAppOutlined /> <span>WhatsApp Suporte</span>
              </a>
            </li>
            {/* <li><Link to="/termos">Termos de Uso</Link></li> */}
            {/* <li><Link to="/privacidade">Política de Privacidade</Link></li> */}
          </ul>
        </div>
      </div>

      {/* Linha Divisória */}
      <hr className="footer-divider" />

      {/* Barra Inferior: Apenas Copyright agora */}
      <div className="lp-footer-bottom-bar">
        <p className="copyright-text">
          © {currentYear} Saldo Zap. Todos os direitos reservados.
        </p>
        {/* Crédito do dev foi movido para a primeira coluna */}
      </div>
    </footer>
  );
};

export default FooterLP;