import React, { Component } from 'react';
import SecureC from '../SecurePart/SecureC';
import AuthComponent from '../AuthComponent/AuthComponent';
import Amplify, { Auth } from 'aws-amplify';
import Home from '../Home/Home';
import Tools from '../Tools/Tools';
import Links from '../Links/Links';
import Blog from '../Blog/Blog';
import AppDrawer from '../AppDrawer/SwipeableTemporaryDrawer';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import aws_exports from '../../aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: false,
      afterLogin: false,   
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.clearLoggingIn = this.clearLoggingIn.bind(this);
  }

  handleStateChange(retState) {
    if (retState === 'signedIn') {
      this.setState(() => ({
        loggingIn: false,
        afterLogin: true
      }));
    }
  }
  
  handleLogin() {
    this.setState(() => ({loggingIn: true}));
  }

  handleLogout(cb) {
    Auth.signOut()
      .then((data) => {
        this.setState(() => ({
          loggingIn: false,
          afterLogin: false
        }));
      })
      .then(() => cb)
      .catch(err => console.log(err))
  }

  clearLoggingIn() {
    console.log("clearLoggingIn: settin loggingIn to false");
    this.setState(() => ({loggingIn: false}));
  }

  render() {
    return (
      <Router>
        <div>
          <AppDrawer 
            afterLogin={this.state.afterLogin}
            handleLogin={this.handleLogin} 
            handleLogout={this.handleLogout}
            getCurrent={this.getCurrent}
            clearLoggingIn={this.clearLoggingIn} 
          />

          {this.state.loggingIn && (
            <AuthComponent 
              clearLoggingIn={this.clearLoggingIn}
              handleStateChange={this.handleStateChange} />
          )}

          {!this.state.loggingIn && (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/tools" component={Tools} />
              <Route path="/links" component={Links} />
              <Route path="/blog" component={Blog} />
              
            </Switch>
          )}

          {(!this.state.loggingIn && this.state.afterLogin) && (
            <Route 
              path="/s" 
              render={props => <SecureC {...props} />}
            />
            )
          } 
        </div>          
      </Router>
    );
  }
}

export default App;
