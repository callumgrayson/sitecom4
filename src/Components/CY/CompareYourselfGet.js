import React, { Component } from 'react';
import axios from 'axios';
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
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

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

class MakeTableRow extends Component {
  constructor(props) {
    super(props);

    this.deleteRow = this.deleteRow.bind(this);
  }

  deleteRow() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const { authId, id, classes } = this.props;
    const userRow = authId === id;
    const userRowStyle = userRow ? classes.rowHighlight : "";
    return (
      <TableRow className={userRowStyle} >
        <TableCell numeric>{this.props.mobile}</TableCell>
        <TableCell numeric>{this.props.height}</TableCell>
        <TableCell numeric>{this.props.shoe}</TableCell>
        <TableCell className={classes.deleteBox}>
          {
            ( authId === id ) && (
              <IconButton
                color='primary'
                onClick={this.deleteRow}
              >
                <Delete />
              </IconButton>
            )
          }
          
        </TableCell>
      </TableRow>
    );
  }
}

function RenderToTable(props) {
  const { authId, data, classes } = props;
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
                id={row.userId}
                mobile={row.mobile}
                height={row.height}
                shoe={row.shoe}
                onDelete={props.handleDelete}
                classes={classes}
                authId={authId}
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
  class CompareYourselfGet extends Component {
    constructor(props) {
      super(props);

      this.state = {
        persons: [],
      };

      this.handleSearch = this.handleSearch.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }


    handleSearch(event) {
      event.preventDefault();

      axios.get('https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself/all', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res.data);
          const persons = res.data.map(person => ({         
            userId: person.userId,
            mobile: person.mobile,
            height: person.height,
            shoe: person.shoe,
          }));
          console.log({persons});
          this.setState({ persons });
        });
    }

    handleDelete(rowId) {
      console.log("The rowId is: " + rowId);
      const deleteId = { params: { id: rowId } };
      console.log("You are about to delete userId: " + rowId);
      axios.delete(`https://4veilmjznk.execute-api.ap-southeast-1.amazonaws.com/dev/compare-yourself`, deleteId )
      .then(resp => {
        const idToFilter = resp.data.id;
        console.log(idToFilter);
        const persons = this.state.persons.filter(person =>
          person.userId !== idToFilter
        );
        this.setState((state) => ({ persons }));
      });
    }

    render() {
      const { persons } = this.state;
      const { classes, authId } = this.props;
      return (
        <div className={classes.cyGet}>
          <div className={classes.buttonBoxSeeAll} >
            <Button
              className={classes.seeAll}
              type='submit'
              variant='contained'
              color='default'
              onClick={this.handleSearch}
              size='small'>
              See All Data
            </Button>
          </div>

          <RenderToTable
            className={classes.tableRender}
            data={persons}
            classes={classes}
            handleDelete={this.handleDelete}
            authId={authId}
          />
        </div>
      );
    }
  }
)
