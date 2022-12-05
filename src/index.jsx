import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { bootstrap } from './bootstrap';
import { HuntingProvider } from './lib/hunter';
import { App } from './app';

bootstrap((hunting) => {
  const rootElement = document.querySelector('#root');
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <HuntingProvider instance={hunting}>
        <App />
      </HuntingProvider>
    </StrictMode>
  );
});
