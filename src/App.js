import React from 'react';
import List from './components/list.js'
import Navigation from './components/navigation-bar.js'
import Button from '@material-ui/core/Button';

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

  downloadJSON = () => {
    let values = this.state.values.concat();

    if (values.length === 0) return;

    const keys = values.shift();
    const json = values.map(value => {
      var obj = {};
      value.forEach(function(element, i) {
        obj[keys[i]] = element;
      });
      return obj;
    });
    const jsonString = JSON.stringify(json);
    const file = new Blob([jsonString], {type: 'application/json'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "sheet.json";
    document.body.appendChild(element);
    element.click();
  }

  render() {
    return (
      <>
        <Navigation
          onSignedIn={() => this.onSignedIn()}
          onChangeSearchBarValue={this.onChangeSearchBarValue}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.downloadJSON}
        >
          Download as JSON
        </Button>
        <List
          values={this.state.values}
        />
      </>
    );
  }
}
