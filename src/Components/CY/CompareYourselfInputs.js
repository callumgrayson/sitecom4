import React from 'react';
import {
  TextField,
  Button,
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


function CompareYourselfInputs(props) {
  const { mobile, height, shoe } = props.userDataToPost;
  const { classes, handleChange, handleSubmit } = props;
  
  return (
    <div className={classes.userBox}>
      <form className={classes.form} onSubmit={handleSubmit} >
        <div className={classes.subform}>
          <div className={classes.fields}>
            <TextField
              name='mobile'
              label='Mobile Value ($)'
              value={mobile}
              onChange={handleChange}
              margin='normal'
              className={classes.field}
            />
            
            <TextField
              name='height'
              label='Height (cm)'
              value={height}
              onChange={handleChange}
              margin='normal'
              className={classes.field}
            />
            
            <TextField
              name='shoe'
              label='Shoe Count (pairs)'
              value={shoe}
              onChange={handleChange}
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
    </div>
  )
}

export default withStyles(styles)(CompareYourselfInputs);
