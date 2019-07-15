import React from 'react';

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    }
  }

  componentDidMount() {
		const CLIENT_ID = '42344234273-9fumaoakru5qon3katr77h7moenjn5jp.apps.googleusercontent.com';
		const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
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
    if (isSignedIn === true) {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
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
