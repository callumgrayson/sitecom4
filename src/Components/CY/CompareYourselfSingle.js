import React, { Component } from 'react';

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
  buttonBoxCY: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
    marginTop: 10,
  },
})

function CompareYourselfSingle(props) {
  const { classes, handleEdit, userData } = props;
  const { mobile, height, shoe } = userData;

  return (
    <div className={classes.userBox}>
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
                primary={mobile}
                secondary={'Mobile Value ($)'}
              />
            </ListItem>
            <ListItem className={classes.listPrevItem} >
              <ListItemText
                primary={height}
                secondary={'Height (cm)'}
              />
            </ListItem>
            <ListItem className={classes.listPrevItem} >
              <ListItemText
                primary={shoe}
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
            onClick={handleEdit}>
            <Icon>edit_icon</Icon>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(CompareYourselfSingle);
