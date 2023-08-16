import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ToastContainer } from 'react-toastify';
import './styled-components/toast/custom-toastify.css';
import 'react-toastify/dist/ReactToastify.css';

import './styled-components/style.css';

console.log('# Renderizando APP');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
        <ToastContainer toastClassName="toastify" />
    </React.StrictMode>
);
