import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { UploadFilesProvider } from './context/UploadFiles.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UploadFilesProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </UploadFilesProvider>
  </StrictMode>,
);