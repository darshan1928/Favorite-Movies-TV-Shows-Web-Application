import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './index.css';
import  { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./context/AuthProvider";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AuthProvider>
    <Toaster />
    <App />
    </AuthProvider>
  </StrictMode>,
)
