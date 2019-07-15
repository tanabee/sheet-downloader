import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list.js'
import GoogleAuth from './components/google-auth.js'

ReactDOM.render(
  <>
    <GoogleAuth />
    <List />
  </>,
  document.getElementById('root')
);
