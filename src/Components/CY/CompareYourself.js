import React, { Component } from 'react';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CompareYourselfSet from './CompareYourselfSet';
import CompareYourselfGet from './CompareYourselfGet';

const styles = (theme) => ({
  bigContainerCY: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paperCY: {
    marginTop: 40,
    paddingBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    maxWidth: 700,
  },
});

class CompareYourself extends Component {
  render() {
    const {classes, auth} = this.props;

    return (
      <div className={classes.bigContainerCY}>
        <Paper className={classes.paperCY}>
          <Typography
            variant='h3'
            align='center'
            gutterBottom>
            Compare Yourself
          </Typography>
          <img 
            src="https://image.freepik.com/free-vector/colorful-people-doing-different-actions_52683-676.jpg" 
            alt="compare-yourself" 
            width="100%" />
          <CompareYourselfSet auth={auth} />
          <CompareYourselfGet auth={auth} />
        </Paper>
      </div>

    );
  }
}

export default withStyles(styles)(CompareYourself);
