import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/minireset.min.css';
import axios from 'axios';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  (async () => {
    // axios baseURL 설정
    // 추후 서버 api 확보되면, 바꿀 예정
    axios.defaults.baseURL = 'http://localhost:3000';
    const { worker } = await import('./mocks/browser');
    worker.start();
  })();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
