// src/main.jsx (أو src/index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // استيراد BrowserRouter هنا فقط

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* لف مكون App بالكامل هنا */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);