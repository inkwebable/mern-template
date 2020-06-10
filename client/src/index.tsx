import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import getHistory from './utils/history';

axios.interceptors.response.use(undefined, (error) => {
  const history = getHistory();

  if (error.response.status === 403) {
    history.push('/login');
  }

  return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
