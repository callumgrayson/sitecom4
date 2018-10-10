import React from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  bigContainerCl: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paperCl: {
    marginTop: '40px',
    margin: 10,
    padding: 10,
    width: '100%',
    maxWidth: 700,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'center',
  },
  big1Space: {
    width: '100%',
    height: '100%',
  },
  big2ButtonBox: {
    width: '100%',
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem1: {
    textAlign: 'center',
  },
  list1: {
    width: '100%',
    height: '40vh',
    overflow: 'hidden',
  },
  imageBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  imageMouse: {
    width: '60%',
    height: '100%',
    maxWidth: 700,
    heigth: 'auto',
  },
});

function TimeStamps(props) {
  const { classes, times, ip } = props;
  if (times.length !== '0') {
    return (
      <div>
        <Typography
          align='center'
          gutterBottom >
          Timestamps (milliseconds elapsed since January 1, 1970 00:00:00 UTC)
        </Typography>
        {
          times.map((t) => {
            const id = t.timestamp.toString();
            const count = t.count;
            const date1 = new Date(t.timestamp);
            const date2 = date1.toString();
            const date3 = `${count} : ${t.timestamp}ms or ${date2} from ${ip}`;

            return (
              <ListItem
                key={id}
                className={classes.listItem1}>
                <ListItemText primary={date3}/>
              </ListItem>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <div className={classes.placeholderCl}>
        <Typography align='center'>
          Click below
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(
  class Clicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        ip: '',
        timeStamps: []
      }

      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
      axios.get(`https://nxe6l78bx2.execute-api.ap-southeast-1.amazonaws.com/dev/clinc`)
      .then(response => {
        const count = response.data.currentClickCount;
        this.setState({ count });
      });
    }

    handleClick(e) {
      e.preventDefault();
      const timestamp1 = Date.now();
      const objSend = {timestamp: timestamp1};
      const header = {'content-type': 'application/json'};
      axios.post(`https://nxe6l78bx2.execute-api.ap-southeast-1.amazonaws.com/dev/clinc`, objSend, header).then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.newClickCount);
        console.log(res.data.sourceIp);
        if (res.data.newClickCount > 0) {
          const tsObj = {
            count: this.state.count + 1,
            timestamp: timestamp1
          }
          const timestamps = [tsObj].concat(this.state.timeStamps);
          this.setState(state => ({
            count: this.state.count + 1,
            timeStamps: timestamps,
            ip: res.data.sourceIp
          }));
        } else {
          console.log("Error: Did not successfully write timestamp");
        }
      });
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.bigContainerCl}>
          <Paper className={classes.paperCl}>
            <div className={classes.big1Space}>
              <Typography
                variant='h3'
                align='center'
                gutterBottom>
                Clicky
              </Typography>

              <div className={classes.imageBox}>
              <img className={classes.imageMouse}
                src="https://image.freepik.com/free-vector/flat-computer-mouse_23-2147743714.jpg" 
                alt="compare-yourself" />
              </div>
               
              <br/>

              <Typography
                variant='h4'
                align='center'
                gutterBottom>
                {this.state.count}
              </Typography>
              <List
                className={classes.list1}
                disablePadding
                dense
                >
                <TimeStamps
                  classes={classes}
                  times={this.state.timeStamps}
                  ip={this.state.ip}
                />
              </List>
            </div>
            <div className={classes.big2ButtonBox}>
              <Button
                onClick={this.handleClick}
                color="primary"
                variant="contained"
              >
                +1
              </Button>
            </div>
          </Paper>
        </div>
      )
    }
  }
)
