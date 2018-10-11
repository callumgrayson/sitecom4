import React, { Component } from 'react';
import CompareYourselfSingle from './CompareYourselfSingle';
import CompareYourselfInputs from './CompareYourselfInputs';
import CompareYourselfAll from './CompareYourselfAll';
import ApiCY from '../../Util/Axios';
import { Auth } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

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
    this.handleGetAll = this.handleGetAll.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
    
    .then(user => {
      // TODO: check this gets userId
      const userId = user.attributes.sub;
      this.setState({userId: userId});
      return userId;
    })

    .then(id => {
      ApiCY.getSingle(id)
      
      .then(res => {
        const { mobile, height, shoe } = res.data[0];
        const showInputs = ( mobile || height || shoe ) ? false : true;
        
        this.setState({ 
          userData: { mobile, height, shoe },
          showInputs: showInputs,
          firstRender: false,
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }
  
  handleChange = ({ target: { name, value } }) => {
    this.setState(state => {
      return {
        userDataToPost: {...state.userDataToPost, [name]: value},
      }
    });
  }

  handleEdit() {
    this.setState({ showInputs: true });
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
        const { mobile, height, shoe } = resJSON;
        
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
          showInputs: false,
        });
      }
    })
    .then(() => {
      this.handleGetAll();
    })
    .catch(err => console.log(err));
  }

  handleGetAll() {
    ApiCY.getAll()
    
    .then(res => {
      const personsData = res.data.map(p => ({         
        userId: p.userId,
        mobile: p.mobile,
        height: p.height,
        shoe: p.shoe,
      }));

      this.setState({ personsData });
    })

    .catch(err => console.log(err));
  }

  handleDelete() {
    const userId = this.state.userId;
    const p = this.state.personsData;
    const persons = p.filter(item => {
      return item.userId !== userId;
    });

    this.setState({ 
      userData: {},
      personsData: persons,
      showInputs: true,
    });
  }

  render() {
    
    const { classes } = this.props;
    const { userId, userData, userDataToPost, personsData } = this.state;

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

          {this.firstRender ? (
                <div className={classes.loadingSingle} >Loading...</div>
          ) : (
                this.state.showInputs ? (
                  <CompareYourselfInputs  handleChange={this.handleChange}
                                          handleSubmit={this.handleSubmit}
                                          userDataToPost={userDataToPost} />
                ) : (
                  <CompareYourselfSingle  handleEdit={this.handleEdit}
                                          userData={userData} />
                )
          )}

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
