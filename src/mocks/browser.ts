// src/mocks/browser.ts
import { setupWorker  } from 'msw/browser';
import { handlers } from './handlers';

// Configure o Service Worker com os manipuladores de requisições
export const worker = setupWorker(...handlers);