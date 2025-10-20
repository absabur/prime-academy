/**
 * Entry point for the React application
 * -------------------------------------
 * Responsibilities:
 *  - Render the React app into the DOM
 *  - Wraps the app with essential providers (ErrorBoundary, Redux, Router)
 *  - Ensures a clean, maintainable setup for production
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App.jsx';
import './index.css'; // Global styles
import store from './redux/store.js';
import ErrorPage from './components/common/ErrorPage.jsx';
import { loadUserFromStorage } from './redux/auth/authSlice.js';

// Mounting point in index.html
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

store.dispatch(loadUserFromStorage());

// Render the React application
root.render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    {/* Redux Provider makes the global store accessible throughout the app */}
    <Provider store={store}>
      {/* BrowserRouter handles client-side routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
