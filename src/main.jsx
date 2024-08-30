// index.js (entry point)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming App is your root component
import { Provider } from 'react-redux';
import store from './store/index.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
