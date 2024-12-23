import React from 'react';
import ReactDOM from 'react-dom/client';  // Use the appropriate import for React 18+
import App from './App';  // Import your App component
import './index.css';  // Ensure your global styles are imported

// Use the appropriate method to render your app based on React version
const root = ReactDOM.createRoot(document.getElementById('root'));  // React 18+ method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
