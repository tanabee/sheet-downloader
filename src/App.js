import React from 'react';
import Navigation from 'components/navigation-bar.js'
import Sheet from 'components/sheet.js'
import LinearProgress from '@material-ui/core/LinearProgress';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tabs: [],
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
    spreadsheetId = spreadsheetId || '1CxgDwe8Mdsi7ohc4oaVucC5c5vXlyZoPNfMdQho1Rl4';
    window.gapi.client.sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId
    }).then(response => {
      const result = response.result;
      const tabs = result.sheets.map((sheet)=> {
        return { name: sheet.properties.title };
      });

      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'A1:Z',
      }).then(response => {
        var range = response.result;
        if (range.values.length > 0) {
          this.setState({
            title: result.properties.title,
            tabs: tabs,
            values: range.values,
            loading: false
          });
        }
      });
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
        <Sheet
          title={this.state.title}
          tabs={this.state.tabs}
          values={this.state.values}
        />
      </>
    );
  }
}
