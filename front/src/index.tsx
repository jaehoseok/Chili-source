import ReactDOM from 'react-dom/client';

import axios from 'axios';

import 'index.css';
import 'styles/minireset.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  (async () => {
    // axios baseURL 설정
    // 추후 서버 api 확보되면, 바꿀 예정
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.withCredentials = true;
    // const { worker } = await import('./mocks/browser');
    // worker.start();
  })();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
