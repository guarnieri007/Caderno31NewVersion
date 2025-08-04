import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { UploadFilesProvider } from './context/UploadFiles.tsx'
import { LanguageProvider } from './context/Language.tsx';
import { PostsProvider } from './context/Posts.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <UploadFilesProvider>
        <AuthProvider>
          <PostsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PostsProvider>
        </AuthProvider>
      </UploadFilesProvider>
    </LanguageProvider>
  </StrictMode>,
);