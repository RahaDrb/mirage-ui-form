import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main-styles.scss';
import './styles/utils.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from './mirage/server';
import { BrowserRouter } from 'react-router-dom';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();