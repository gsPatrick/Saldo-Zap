// src/pages/TermsOfUse/TermsOfUsePage.jsx
import React, { useEffect } from 'react';
import Header from '../../componentsLP/Header/Header';
import FooterLP from '../../componentsLP/Footer/Footer';
import './TermsOfUsePage.css';

const TermsOfUsePage = () => {
  useEffect(() => {
    // Opcional: Rolagem para o topo da página ao carregar
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-container">
      <Header />
      <main className="terms-main-content">
        <div className="terms-text-container">
          <h1 className="terms-title">Termos de Uso da Plataforma Saldo Zap</h1>
          <p>Este Termo de Uso (“Termo”) estabelece as condições que regulam a utilização dos serviços prestados pela plataforma digital Saldo Zap (“Plataforma” ou “Serviço”), de titularidade do Contratante. Ao acessar ou utilizar a Plataforma, o Usuário expressamente reconhece e concorda, de forma irrevogável e irretratável, com todos os termos e condições aqui descritos.</p>

          <h2 className="terms-section-title">1. Coleta e Utilização de Cookies</h2>
          <p>1.1. O Usuário declara estar ciente e concorda que a Plataforma poderá coletar cookies durante a navegação e utilização dos serviços.</p>
          <p>1.2. Os cookies serão utilizados exclusivamente para fins técnicos, com o objetivo de viabilizar integrações e operações vinculadas à infraestrutura da plataforma Facebook/META.</p>
          <p>1.3. Nenhuma informação sensível ou pessoal será transmitida a terceiros sem o consentimento prévio e expresso do Usuário, salvo nas hipóteses legalmente autorizadas.</p>
          <p>1.4. O Usuário poderá, a qualquer momento, gerenciar suas preferências de cookies por meio das configurações de seu navegador, ciente de que a desativação poderá comprometer a experiência de uso da Plataforma.</p>

          <h2 className="terms-section-title">2. Dados Sensíveis</h2>
          <p>2.1. A Plataforma não coleta, armazena ou trata dados sensíveis, conforme definido no artigo 5º, inciso II, da Lei nº 13.709/18 (Lei Geral de Proteção de Dados – LGPD).</p>
          <p>2.2. A responsabilidade pela inserção, compartilhamento ou divulgação de quaisquer dados sensíveis por meio do Serviço é exclusivamente do Usuário, não recaindo sobre a Plataforma qualquer obrigação de supervisão, armazenamento ou tratamento.</p>

          <h2 className="terms-section-title">3. Cobrança e Pagamento</h2>
          <p>3.1. A utilização do Serviço está condicionada ao pagamento de uma mensalidade, cujo valor será informado previamente no momento da contratação, ou definido em contrato específico firmado entre as partes.</p>
          <p>3.2. O pagamento será efetuado por meio das formas disponibilizadas na Plataforma, com renovação automática a cada ciclo, salvo manifestação contrária do Usuário registrada antes da data de renovação.</p>
          <p>3.3. O não pagamento de qualquer valor devido poderá resultar na suspensão imediata ou cancelamento definitivo do acesso ao Serviço.</p>

          <h2 className="terms-section-title">4. Cancelamento</h2>
          <p>4.1. O cancelamento da assinatura poderá ser solicitado pelo Usuário a qualquer momento, por meio da plataforma Kirvano, responsável pela gestão de pagamentos.</p>
          <p>4.2. Após a solicitação de cancelamento, o acesso ao Serviço será mantido até o término do ciclo vigente, sem reembolso de valores já pagos.</p>
          <p>4.3. O Usuário reconhece que a solicitação de estorno ou contestação de valores pagos junto à operadora de pagamento, após utilização do Serviço, não será válida, salvo falha técnica comprovada de responsabilidade da Plataforma.</p>

          <h2 className="terms-section-title">5. Vinculação da Conta</h2>
          <p>5.1. A conta de acesso do Usuário está vinculada ao endereço de e-mail fornecido no momento do cadastro.</p>
          <p>5.2. A alteração do e-mail cadastrado não será permitida, salvo em casos excepcionais, a exclusivo critério da Plataforma, mediante solicitação fundamentada do Usuário.</p>

          <h2 className="terms-section-title">6. Disposições Gerais</h2>
          <p>6.1. A aceitação destes Termos é condição indispensável para a utilização do Serviço.</p>
          <p>6.2. Ao prosseguir com o uso da Plataforma, o Usuário declara que leu, compreendeu e concorda com todas as cláusulas aqui estabelecidas.</p>
          <p>6.3. Este Termo poderá ser alterado unilateralmente pela Plataforma a qualquer tempo. É responsabilidade do Usuário consultar periodicamente este documento. A continuidade do uso do Serviço após alterações será considerada como aceitação tácita dos novos termos.</p>
          <p>6.4. Fica eleito o foro da Comarca de São Paulo/SP, com renúncia expressa de qualquer outro, por mais privilegiado que seja, salvo disposição legal específica aplicável à relação de consumo.</p>

        </div>
      </main>
      <FooterLP />
    </div>
  );
};

export default TermsOfUsePage;