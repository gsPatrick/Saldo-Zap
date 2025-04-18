// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css'; // Importa o reset CSS do AntD V5+
import './index.css';         // Importa nossos estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolve o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);