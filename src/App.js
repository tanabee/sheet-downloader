import React from 'react';
import List from './components/list.js'
import GoogleAuth from './components/google-auth.js'

export default class App extends React.Component {
  render() {
    return (
      <>
        <GoogleAuth />
        <List />
      </>
    );
  }
}
