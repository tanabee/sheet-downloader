import React from 'react';
import Navigation from './components/navigation-bar.js'
import DownloadButton from './components/download-button.js'
import List from './components/list.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
  }

  onSignedIn = () => {
    this.fetchAndShowList();
  };

  onChangeSearchBarValue = event => {
    const url = event.target.value;
    const match = url.match(/^https:\/\/docs.google.com\/spreadsheets\/d\/(.+)\/.*/);
    if (match) {
      this.fetchAndShowList(match[1]);
    }
  }

  fetchAndShowList = (spreadsheetId) => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId || '1-zpaIm5Xz_HgB3TqyHkf3JtvYh_JPCtPUiw0oYs9Z5Q',
      range: 'A1:Z',
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
        <Navigation
          onSignedIn={() => this.onSignedIn()}
          onChangeSearchBarValue={this.onChangeSearchBarValue}
        />
        <DownloadButton
          values={this.state.values}
        />
        <List
          values={this.state.values}
        />
      </>
    );
  }
}
