import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import {
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  userBox: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    background: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column'
  },
  listBox: {
    display: 'flex',
    width: '100%',
    background: '#fff',
  },
  titleBox: {
    display: 'flex',
    width: '100%',
    background: '#fff',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    background: '#fff',
    margin: 20,
  },
  listPrev: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listPrevItem: {
    display: 'flex',
    width: 200,
    textAlign: 'center',
    background: '#fff'
  },
  buttonBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    bottom: 50,
  },
  editButton: {
    position: 'relative',
    right: 5,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    background: '#fff',
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
    marginTop: 10,
  },
})


class CompareYourselfSet extends Component {
  constructor(props) {
    super(props);

  }
  
  render() {

    const { classes, handleEdit } = this.props;

    return (
      <div className={classes.userBox}>
        {
          (!showInputs) ? (
            <div className={classes.savedBox} >
              <div className={classes.titleBox} >
                <Typography align='center' variant="h6" className={classes.title}>
                  Your Saved Data
                </Typography>
              </div>

              <div className={classes.listBox} >
                <List className={classes.listPrev} >
                  <ListItem className={classes.listPrevItem} >
                    <ListItemText
                      primary={prevMobile}
                      secondary={'Mobile Value ($)'}
                    />
                  </ListItem>
                  <ListItem className={classes.listPrevItem} >
                    <ListItemText
                      primary={prevHeight}
                      secondary={'Height (cm)'}
                    />
                  </ListItem>
                  <ListItem className={classes.listPrevItem} >
                    <ListItemText
                      primary={prevShoe}
                      secondary={'Shoe Count (pairs)'}
                    />
                  </ListItem>
                </List>
                
              </div>
              <div className={classes.buttonBox} >
                <IconButton 
                  size='small' 
                  color="default" 
                  aria-label="Edit" 
                  className={classes.editButton}
                  onClick={this.handleShowInputs}>
                  <Icon>edit_icon</Icon>
                </IconButton>
              </div>
            </div>
          ) : (
            <form className={classes.form} onSubmit={this.handleCreate}>
              <div className={classes.subform}>
                <div className={classes.fields}>
                  <TextField
                    name='mobile'
                    label='Mobile Value ($)'
                    value={mobile}
                    onChange={this.handleChange}
                    margin='normal'
                    className={classes.field}
                  />
                  
                  <TextField
                    name='height'
                    label='Height (cm)'
                    value={height}
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
                <div className={classes.buttonBoxCY} >
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained' >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          )
        }

        
      </div>
    );
  }















  handleShowInputs(e) {
    e.preventDefault();
    this.setState({showInputs: true});
  }


  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const clientId = user.pool.clientId;
        this.setState({userId: clientId});
        return user.pool.clientId;
      })
      .then(id => {
        this.setState({userId: id});

        return axios.get(`https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself/single`, {
          params: {
            userId: id
          }
        }).then(resp1 => {

          const { mobile, height, shoe } = resp1.data[0];
          this.setState({prevPost: { mobile, height, shoe }});
          this.props.handleAuthIn(id);
        }).catch(err => console.log(err));
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
    const { mobile, height, shoe } = this.state.toPost;
    const userId = this.state.userId;
    const timestamp = Date.now();

    axios.post('https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself',
    { userId, mobile, height, shoe, timestamp },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {

        const resJ = JSON.parse(result.config.data); 

        if (result.data.message === "Post Successful") {

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

  
}

export default withStyles(styles)(CompareYourselfSet);
