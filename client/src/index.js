import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ProductProvider} from './contextAPI';

ReactDOM.render(
  <ProductProvider>
    <Router>
    <App />
  </Router>
  </ProductProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();