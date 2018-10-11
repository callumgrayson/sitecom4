import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import { PublicItems, ProtectedItems } from './tileData';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    position: "fixed",
    top: 0,
    marginLeft: -20,
    marginRight: 20,
  },
};



function typographyV1Theme() {
  return createMuiTheme({
    typography: {
      suppressDeprecationWarnings: true,
      useNextVariants: false,
    },
  });
}

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, afterLogin } = this.props;
    const { handleLogin, handleLogout, getCurrent, clearLoggingIn } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          
          <PublicItems 
            afterLogin={afterLogin}
            handleLogin={handleLogin}
            getCurrent={getCurrent}
            clearLoggingIn={clearLoggingIn} />
        </List>
        <Divider />
        <List>
          <ProtectedItems 
            handleLogout={handleLogout}
            afterLogin={afterLogin} />
        </List>
      </div>
    );

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <MuiThemeProvider theme={typographyV1Theme}>
        <div className={classes.stDrawer}>
          <Toolbar className={classes.menuButton}>
            <IconButton              
              color="primary" 
              aria-label="Menu" 
              onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          
          <SwipeableDrawer 
            open={this.state.left}
            onClose={this.toggleDrawer('left', false)}
            onOpen={this.toggleDrawer('left', true)}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} 
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {sideList}
            </div>
          </SwipeableDrawer>
        </div>  
      </MuiThemeProvider>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);