import React from 'react';
import Navigation from './components/navigation-bar.js'
import DownloadButton from './components/download-button.js'
import List from './components/list.js'
import LinearProgress from '@material-ui/core/LinearProgress';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      loading: false
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
    this.setState({ loading: true });
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId || '1CxgDwe8Mdsi7ohc4oaVucC5c5vXlyZoPNfMdQho1Rl4',
      range: 'A1:Z',
    }).then(response => {
      var range = response.result;
      if (range.values.length > 0) {
        this.setState({
          values: range.values,
          loading: false
        });
      }
    });
  }

  render() {
    const progress = this.state.loading ?  <LinearProgress /> : '';

    return (
      <>
        <Navigation
          onSignedIn={() => this.onSignedIn()}
          onChangeSearchBarValue={this.onChangeSearchBarValue}
        />
        { progress }
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
