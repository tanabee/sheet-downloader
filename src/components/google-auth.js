import React from 'react';

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    };
  }

  componentDidMount() {
		const CLIENT_ID = '42344234273-9fumaoakru5qon3katr77h7moenjn5jp.apps.googleusercontent.com';
		const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
    const API_KEY = 'AIzaSyDe9ppD4WsvWPi6kDIvvR9Cjo4stOBUKm0';

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPE
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    this.setState({isSignedIn: isSignedIn});
    if (isSignedIn === true) {
      this.props.onSignedIn();
    }
  };

  onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="">
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="">
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
