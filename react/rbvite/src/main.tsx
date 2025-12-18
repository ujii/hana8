import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CounterProvider } from './hooks/CounterContext.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </StrictMode>
);
