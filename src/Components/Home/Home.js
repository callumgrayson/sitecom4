import React, { Component } from 'react';
import Clicker from '../Clicker/Clicker';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
  home: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  imageHome: {
    width: '100%',
    height: '100%',
    maxWidth: 700,
    heigth: 'auto',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.home} >
        <br/>
        <br/>
        <div className={classes.imageBox}>
          <img className={classes.imageHome}
            src="https://image.freepik.com/free-vector/isometric-home-interior-renovation-and-repair-work-process-stages-in-house-cross-section_33099-399.jpg" 
            alt="compare-yourself" 
          />
        </div>
        <Divider />
        <Clicker />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
