import React from 'react';
import List from './components/list.js'
import GoogleAuth from './components/google-auth.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  onSignedIn = () => {
    this.fetchAndShowList();
  };

  fetchAndShowList = () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1-zpaIm5Xz_HgB3TqyHkf3JtvYh_JPCtPUiw0oYs9Z5Q',
      range: 'シート1!A1:E',
    }).then(response => {
      var range = response.result;
      if (range.values.length > 0) {
        this.onFetchSheet(range.values);
      }
    });
  }

  onFetchSheet = values => {
    this.setState({values: values});
  };

  render() {
    return (
      <>
        <GoogleAuth
          onSignedIn={() => this.onSignedIn()}
        />
        <List
          values={this.state.values}
        />
      </>
    );
  }
}
