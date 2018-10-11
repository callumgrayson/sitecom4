import React, { Component } from 'react';
import {  Paper,
          Typography,
          } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CompareYourselfSingle from './CompareYourselfSingle';
import CompareYourselfInputs from './CompareYourselfInputs';
import CompareYourselfAll from './CompareYourselfAll';
import ApiCY from '../../Util/Axios';

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
      userId: '',
      userData: {},
      personsData: [],
      userDataToPost: {
        mobile: '',
        height: '',
        shoe: '',
      },
      showInputs: false,
      showAll: false,
      firstRender: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((state) => {
      return {
        toPost: {...state.userDataToPost, [name]: value},
      }
    });
  }

  handleEdit() {
    this.setState({showInputs: true});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { mobile, height, shoe } = this.state.userDataToPost;
    const userId = this.state.userId;
    const timestamp = Date.now();
    const postData = { mobile, height, shoe, userId, timestamp };

    ApiCY.postSingle(postData)
    .then(res => {
      const resJSON = JSON.parse(res.config.data); 

      if (res.data.message === "Post Successful") {
        const {mobile, height, shoe} = resJSON;
        
        this.setState({
          userData: {
            mobile,
            height,
            shoe,
          },
          userDataToPost: {
            mobile: '',
            height: '',
            shoe: '',
          },
        });
      }
    })
  }

  render() {
    
    const { classes } = this.props;
    const { userId, userData, toPost, personsData } = this.state;

    return (
      <div className={classes.bigContainerCY} >
        <Paper className={classes.paperCY} >
          
          <Typography variant='h3'
                      align='center'
                      gutterBottom >
                      Compare Yourself
          </Typography>
          
          <img  src="https://image.freepik.com/free-vector/colorful-people-doing-different-actions_52683-676.jpg" 
                alt="compare-yourself" 
                width="100%" />

          <CompareYourselfSingle  handleEdit={this.handleEdit}
                                  userData={userData} />

          <CompareYourselfInputs  handleChange={this.handleChange}
                                  handleSubmit={this.handleSubmit}
                                  toPost={toPost} />

          <CompareYourselfAll userId={userId}
                              personsData={personsData}
                              handleGetAll={this.handleGetAll}
                              handleDelete={this.handleDelete} />
        
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CompareYourself);
