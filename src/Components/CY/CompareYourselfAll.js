import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';

const styles = (theme) => ({
  cyGet: {
    marginTop: 40,
    paddingBottom: 20,
    minHeight: 60,
  },
  buttonBoxSeeAll: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tableRender: {
    width: '100%',
  },
  tableBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableCY: {
    margin: 'auto',
    minWidth: 100,
    maxWidth: 500,
  },
  captionBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rowHighlight: {
    background: '#fccccf',
  }
});

function MakeTableRow(props) {
  const { userId, key, classes, handleDelete } = props;
  const { mobile, height, shoe } = props;
  const userRow = userId === key;
  const userRowStyle = userRow ? classes.rowHighlight : "";
  return (
    <TableRow className={userRowStyle} >
      <TableCell numeric>{mobile}</TableCell>
      <TableCell numeric>{height}</TableCell>
      <TableCell numeric>{shoe}</TableCell>
      <TableCell className={classes.deleteBox}>
        {
          userRow && (
            <IconButton
              color='primary'
              onClick={handleDelete}
            >
              <Delete />
            </IconButton>
          )
        }
      </TableCell>
    </TableRow>
  );
}

function RenderToTable(props) {
  const { userId, data, classes, handleDelete } = props;
  if (data.length) {
    return (
      <div className={classes.tableBox}>
        <Table
          className={classes.tableCY}
          padding='checkbox'>
          <TableHead>
            <TableRow>
              <TableCell numeric>Mobile ($)</TableCell>
              <TableCell numeric>Height (cm)</TableCell>
              <TableCell numeric>Shoe Count (pairs)</TableCell>
              <TableCell numeric></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <MakeTableRow
                key={row.userId}
                mobile={row.mobile}
                height={row.height}
                shoe={row.shoe}
                handleDelete={handleDelete}
                classes={classes}
                userId={userId}
              />
              ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className={classes.captionBox} >
        <Typography>
          Fetch to see all stored data...
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(
  function CompareYourselfAll() {
    const { classes, userId, personsData, handleSearch, handleDelete } = this.props;
    
    return (
      <div className={classes.cyGet}>
        <div className={classes.buttonBoxSeeAll} >
          <Button
            className={classes.seeAll}
            type='submit'
            variant='contained'
            color='default'
            onClick={handleSearch}
            size='small'>
            See All Data
          </Button>
        </div>

        <RenderToTable
          className={classes.tableRender}
          data={personsData}
          classes={classes}
          handleDelete={handleDelete}
          userId={userId}
        />
      </div>
    );
  }
)
