import React, { Component } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  authContainer: {
    width: '100%',
    paddingTop: 20,
    marginTop: 40,
    background: '#fff',
  },
  buttonBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 0,
    marginTop: 50,
  },
  authComponentBox: {
    width: '100%',
  },
  authButton: {
    position: 'relative',
    right: 30,
    bottom: 30,
  },
})


class AuthComponent extends Component {
  render() {
    const { clearLoggingIn, handleStateChange, classes } = this.props;
    return (
      <div className={classes.authContainer}>
        <Authenticator onStateChange={handleStateChange} />
        <div className={classes.buttonBox} >
          <Button 
            onClick={clearLoggingIn}
            className={classes.authButton}
            variant='default' >
            Cancel
          </Button>
        </div>
        
      </div>
    )
  }
}

  export default withStyles(styles)(AuthComponent);