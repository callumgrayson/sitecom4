import React, { Component } from 'react';
import Clicker from '../Clicker/Clicker';
import { withStyles } from '@material-ui/core/styles';

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
    marginTop: 30,
    marginBottom: 50,
  },
  imageHome: {
    width: '100%',
    height: '100%',
    maxWidth: 700,
    heigth: 'auto',
  },
  title: {
    textAlign: 'center',
  },
  blurb: {
    width: '66%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  clickerBox: {
    background: '#fccccf',
    paddingBottom: 30,
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.home} >
        <br/>
        <br/>
        <div className={classes.title}>
          <h1 >Callum Grayson</h1>
          <h3>Web Developer</h3>
        </div>

        <div className={classes.blurb}>
          <p>
            Web developer profile of Callum Grayson and showcase of full stack work.</p>
          <p>You can see the front end work! 
            If you know what you are looking for you will also see interaction with a server and database.</p>
          <p>
            Login to see the secure features of this site.
            See the reference page and links page for my favourite resources.
            Click on some of the fun projects below to be delighted and amazed.
          </p>
        </div>
        
        <div className={classes.imageBox}>
          <img className={classes.imageHome}
            src="https://image.freepik.com/free-vector/isometric-home-interior-renovation-and-repair-work-process-stages-in-house-cross-section_33099-399.jpg" 
            alt="compare-yourself" 
          />
        </div>
        <div className={classes.clickerBox}>
          <Clicker />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
