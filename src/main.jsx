import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initLogger } from './logger/logger.js';
import { initGlobalErrorHandlers } from './error/globalHandlers.js';

/**
 * Application entry point.
 *
 * Mounts the root React component into the DOM element with id `root`.
 *
 * @type {HTMLElement}
 */
const rootElement = document.getElementById('root');

initLogger();
initGlobalErrorHandlers();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
