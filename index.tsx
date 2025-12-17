import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorDisplay from './components/ErrorDisplay';
import { translations } from './translations';
import { getInitialLanguage, Language } from './contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);

const getApiKey = (): string | undefined => {
  // First, check for environment variable (Vite uses import.meta.env)
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY as string;
  }
  
  // Then, check if key injected by hosting platform (like Netlify/Vercel)
  if ((window as any).GEMINI_API_KEY && (window as any).GEMINI_API_KEY.startsWith('AIza')) {
    return (window as any).GEMINI_API_KEY;
  }
  
  // Return undefined if no API key is found
  return undefined;
};

// This function attempts to render the app.
// It will be called after the entire page is loaded to ensure any script injection has run.
const initializeApp = () => {
  // Always render the main app, regardless of API key presence
  // The Chatbot component handles missing keys gracefully
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Wait for the entire page to load, including any injected scripts.
window.addEventListener('load', initializeApp);
