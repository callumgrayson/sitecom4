import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Tooltip } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { Link, withRouter } from 'react-router-dom';
import { SvgIcon } from '@material-ui/core';
import { AccountCircle, Build, Clear, Link as LinkIcon, Notes } from '@material-ui/icons';

const AuthOutButton = withRouter(
  ({ history, handleLogout }) => (
    <ListItem button 
      onClick={() => {
        handleLogout(() => history.push("/"));
      }}
    >
      <ListItemIcon>
        <Clear />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItem>
  )
); 

const AuthInButton = withRouter(
  ({ history, handleLogin }) => (
    <ListItem button 
      onClick={() => {
        handleLogin(() => history.push("/s"));
      }}
    >
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Login"/>
    </ListItem>
  )
);

export function PublicItems(props) {
  return (
    <div>

      <Link to="/" style={{textDecoration: 'none'}} >
        <ListItem >
          <ListItemIcon>
            <SvgIcon>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>

      <Link to="/tools" style={{textDecoration: 'none'}}>
        <ListItem >
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItem>
      </Link>

      <Link to="/blog" style={{textDecoration: 'none'}} >
        <ListItem >
          <ListItemIcon>
            <Notes />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
      </Link>

      <Link to="/links" style={{textDecoration: 'none'}} >
        <ListItem >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="Links" />
        </ListItem>
      </Link>

      {
        !props.afterLogin && (
          <div>
            <Divider />
            <AuthInButton handleLogin={props.handleLogin} />
          </div>
        )
      }
      
    </div>
  )
};

export const ProtectedItems = (props) => (
  <div>
    {
      props.afterLogin ? (
        <Link to="/s" style={{textDecoration: 'none'}} >
          <ListItem button >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Compare Yourself" />
          </ListItem>
        </Link>
      ) : (
        <Tooltip title="Login to see content">
          <ListItem button disabled={!props.afterLogin} >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Compare Yourself" />
          </ListItem>
        </Tooltip>
        
      )
    }
    
    {
      props.afterLogin && (
        <Link to="/" style={{textDecoration: 'none'}} >
          <AuthOutButton handleLogout={props.handleLogout} />
        </Link>
      )
    }
  </div>
);
