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
  constructor(props) {
    super(props);

    this.state = {
      authId: '',
    }

    this.handleAuthIn = this.handleAuthIn.bind(this);
  }

  handleAuthIn(idIn) {
    this.setState({authId: idIn});
  }

  render() {
    const {classes} = this.props;
    const authId = this.state.authId;

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
          <CompareYourselfSet handleAuthIn={this.handleAuthIn} />
          <CompareYourselfGet authId={authId} />
        </Paper>
      </div>

    );
  }
}

export default withStyles(styles)(CompareYourself);
