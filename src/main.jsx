import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Error handler for uncaught errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Window Error: ', msg, url, lineNo, columnNo, error);
  return false;
};

// Error handler for unhandled promise rejections
window.onunhandledrejection = function(event) {
  console.error('Unhandled Promise Rejection: ', event.reason);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);