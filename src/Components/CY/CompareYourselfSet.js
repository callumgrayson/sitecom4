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
    userId: '',
    prevPost: {
      mobile: '',
      height: '',
      shoe: '',
    },
    toPost: {
      timestamp: '',
      mobile: '',
      height: '',
      shoe: '',
    },
    posted: {
      mobile: '',
      height: '',
      shoe: '',
    },
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user.pool.clientId);
        const clientId = user.pool.clientId;
        this.setState({userId: clientId});
        return user.pool.clientId;
      })
      // .then(id => {
      //   this.setState({userId: id});
      //   axios.get().then(userData => {
      //     // if userData exists set it to prevPost
      //     if (userData) {
      //       console.log("userDat Data exists so we'll setState");
            
      //     }         
      //   });
      // })
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
    const { mobile, height, shoe } = this.state.toPost;
    const userId = this.state.userId;
    const timestamp = Date.now();
    console.log(`handleCreate: ahiut: ${mobile} ${height} ${shoe} ${userId} ${timestamp}`);

    axios.post('https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself',
    { userId, mobile, height, shoe, timestamp },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        console.log(result);
        console.log(result.data.message);
        console.log(result.config.data);
        const resJ = JSON.parse(result.config.data); 
        console.log(resJ);
        console.log(resJ.userId);
        console.log(resJ.height);
        console.log(resJ.mobile);
        console.log(resJ.shoe);
        if (result.data.message === "Post Successful") {
          console.log("Inside IF ");
          const respU = resJ.userId;
          const respM = resJ.mobile;
          const respH = resJ.height;
          const respS = resJ.shoe;
          this.setState({
            posted: {
              userId: respU,
              mobile: respM,
              height: respH,
              shoe: respS,
            },
            toPost: {
              userId: '',
              mobile: '',
              height: '',
              shoe: '',
            },
          });
        }
      }
    );
  }

  render() {
    const { mobile, height, shoe } = this.state.toPost;
    const { classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleCreate}>
        <div className={classes.subform}>
          <div className={classes.fields}>
            <TextField
              name='height'
              label='Height (cm)'
              value={height}
              onChange={this.handleChange}
              margin='normal'
              className={classes.field}
            />
            <TextField
              name='mobile'
              label='Mobile Value ($)'
              value={mobile}
              onChange={this.handleChange}
              margin='normal'
              className={classes.field}
            />
            <TextField
              name='shoe'
              label='Shoe Count (pairs)'
              value={shoe}
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
