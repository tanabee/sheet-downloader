import React from 'react';
import NavigationBar from 'components/NavigationBar';
import Sheet from 'components/Sheet';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spreadSheetId: '1CxgDwe8Mdsi7ohc4oaVucC5c5vXlyZoPNfMdQho1Rl4',
      title: '',
      tabs: [],
      values: [],
      loading: false,
    };
  }

  onSignedIn = () => {
    this.fetchAndShowList();
  };

  onChangeTab = tabIndex => {
    this.fetchAndShowList(null, tabIndex);
  };

  onChangeSearchBarValue = event => {
    const url = event.target.value;
    const match = url.match(
      /^https:\/\/docs.google.com\/spreadsheets\/d\/(.+)\/.*/,
    );
    if (match) {
      this.fetchAndShowList(match[1]);
    }
  };

  fetchAndShowList = (spreadsheetId, tabIndex) => {
    this.setState({loading: true});
    spreadsheetId = spreadsheetId || this.state.spreadSheetId;
    window.gapi.client.sheets.spreadsheets
      .get({
        spreadsheetId: spreadsheetId,
      })
      .then(response => {
        const result = response.result;
        const tabs = result.sheets.map(sheet => {
          return {name: sheet.properties.title};
        });

        window.gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: spreadsheetId,
            range: tabIndex ? tabs[tabIndex].name + '!A1:Z' : 'A1:Z',
          })
          .then(response => {
            var range = response.result;
            if (range.values.length > 0) {
              this.setState({
                spreadsheetId: spreadsheetId,
                title: result.properties.title,
                tabs: tabs,
                values: range.values,
                loading: false,
              });
            }
          });
      });
  };

  render() {
    return (
      <>
        <NavigationBar
          onSignedIn={() => this.onSignedIn()}
          onChangeSearchBarValue={this.onChangeSearchBarValue}
          loading={this.state.loading}
        />
        <Sheet
          title={this.state.title}
          tabs={this.state.tabs}
          values={this.state.values}
          onChangeTab={this.onChangeTab}
        />
      </>
    );
  }
}
