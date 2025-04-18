// src/componentsLP/FinalCTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './FinalCTASection.css';

const FinalCTASection = () => {
  return (
    <section className="final-cta-section">
      <div className="final-cta-content">
        <h2 className="final-cta-title">Pronto para Simplificar Suas Finanças?</h2>
        <p className="final-cta-description">
          Assuma o controle do seu dinheiro com a ajuda da inteligência artificial, diretamente no seu WhatsApp.
        </p>
        <Link to="/signup"> {/* Link para a página de cadastro */}
          <Button
            type="primary"
            size="large"
            className="final-cta-button"
            icon={<ArrowRightOutlined />}
          >
            Comece Seus 7 Dias Grátis Agora
          </Button>
        </Link>
        <p className="final-cta-subtext">
          Sem cartão de crédito. Sem compromisso.
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;