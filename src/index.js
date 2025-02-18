import React from 'react';
import { createRoot } from 'react-dom/client'; // Thay đổi ở đây
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}
const container = document.getElementById('root');
const root = createRoot(container); // Thay đổi ở đây

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
);