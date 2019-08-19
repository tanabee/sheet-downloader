import React from 'react';
import config from 'utils/config.json'
import Button from '@material-ui/core/Button';

export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    };
  }

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: config.api_key,
          clientId: config.client_id,
          discoveryDocs: config.discovery_docs,
          scope: config.scope
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
        <Button variant="outlined" onClick={this.onSignOutClick}>Sign Out</Button>
      );
    } else {
      return (
        <Button variant="outlined" color="primary" onClick={this.onSignInClick}>Sign In</Button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}
