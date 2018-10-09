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
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell numeric>{this.props.age}</TableCell>
        <TableCell numeric>{this.props.height}</TableCell>
        <TableCell numeric>{this.props.income}</TableCell>
        <TableCell className={classes.deleteBox}>
          <IconButton
            color='primary'
            onClick={this.deleteRow}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

function RenderToTable(props) {
  const { data, classes } = props;
  if (data.length) {
    return (
      <div className={classes.tableBox}>
        <Table
          className={classes.tableCY}
          padding='checkbox'>
          <TableHead>
            <TableRow>
              <TableCell numeric>Age (years)</TableCell>
              <TableCell numeric>Height (in)</TableCell>
              <TableCell numeric>Income ($/mth)</TableCell>
              <TableCell numeric></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <MakeTableRow
                key={row.userId}
                id={row.userId}
                age={row.age}
                height={row.height}
                income={row.income}
                onDelete={props.handleDelete}
                classes={props.classes}
              />
              ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        <Typography align='left'>
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
          // console.log(res.data);
          const persons = res.data.map(person => ({
            userId: person.userId,
            age: person.age,
            height: person.height,
            income: person.income
          }));
          // console.log(persons);
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
      const { classes } = this.props;
      return (
        <div className={classes.cyGet}>
          <Button
            className={classes.seeAll}
            type='submit'
            variant='raised'
            color='secondary'
            onClick={this.handleSearch}
            size='small'>
            See All Data
          </Button>
          <RenderToTable
            className={classes.tableRender}
            data={persons}
            classes={classes}
            handleDelete={this.handleDelete}/>
        </div>
      );
    }
  }
)
