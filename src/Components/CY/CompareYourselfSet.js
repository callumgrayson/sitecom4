import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
  },
  subform: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fields: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  field: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonBoxCY: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
})


class CompareYourselfSet extends Component {
  state = {
    toPost: {
      userId: '',
      timestamp: '',
      age: '',
      height: '',
      income: '',
    },
    posted: {},
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser()
        .then(user => {
          console.log(user.pool.clientId);
          const clientId = user.pool.clientId;
          this.setState({toPost: {userId: clientId}});
        })
        .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {

    this.setState(function(state) {
      return {
        toPost: {...state.toPost, [name]: value},
      }
    });
  }


  handleCreate = e => {
    e.preventDefault();
    const { age, height, income, userId } = this.state.toPost;
    const timestamp = Date.now();
    console.log(`handleCreate: ahiut: ${age} ${height} ${income} ${userId} ${timestamp}`);

    axios.post('https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself',
    { userId, age, height, income, timestamp },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result) {
          console.log("Response data: " + result.data);
          this.setState({
            posted: {
              userId: userId,
              age: age,
              height: height,
              income: income,
            },
            toPost: {
              userId: '',
              age: '',
              height: '',
              income: '',
            },
          });
        }
      }
    );
  }

  render() {
    const { age, height, income } = this.state.toPost;
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleCreate}>
        <div className={classes.subform}>
          <div className={classes.fields}>
            <TextField
              name='age'
              label='Age'
              value={age}
              onChange={this.handleChange}
              margin='normal'
              className={classes.field}
            />
            <TextField
              name='height'
              label='Height'
              value={height}
              onChange={this.handleChange}
              margin='normal'
              className={classes.field}
            />
            <TextField
              name='income'
              label='Income'
              value={income}
              onChange={this.handleChange}
              margin='normal'
              className={classes.field}
            />
          </div>
          <div className={classes.buttonBoxCY}>
            <Button
              type='submit'
              color='primary'
              variant='raised'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(CompareYourselfSet);
