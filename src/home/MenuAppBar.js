// Code from Material UI "App Bar with menu".
// https://material-ui.com/components/app-bar/#app-bar-with-menu

import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MenuAppBar(props) {

  // It took me a while, but I eventually found that anchorEl & setAnchorEl could not be definied in MenuAppBar, but instead had to be defined in the parent (App.js), and then passed in.  That way, when logging out, the anchorEl could be set to null when clearing the token, so that the next time signing in, it isn't already set, and therefore shows the list menu.
  const { anchorEl } = props;
  const { setAnchorEl } = props;

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const open = (anchorEl) => {
    if (anchorEl == null) {
      return false;
    } else {
      return true;
    }}

  if (props.token =='') {
    var token = false;
  } else {
    var token = true;
  }

  // const handleChange = (event) => {
    // setAuth(event.target.checked);
  //   props.token && props.clickLogout() 
  // };

  const handleMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      {/* This section was the Login toggle switch */}
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          control={<Switch checked={props.token} onChange={handleChange} aria-label="login switch" />}
          label={props.token ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          {/* This section was the menu (icon) at the top-left of the screen.
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Order System
          </Typography>
          {/* {props.token && ( */}
          { token ?
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={(event) => handleMenu(event)}
                // onClick={() => setAnchorEl(<button />)}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                // open={open()}
                // open={(anchorEl) => {if (anchorEl==null) {return false} else {return true}}}
                open={open(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={props.clickLogout}>Logout</MenuItem>
              </Menu>
            </div>
          : null }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;