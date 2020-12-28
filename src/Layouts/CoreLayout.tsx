import React, { useState, ReactElement } from 'react'
import 'firebase/auth'
import 'firebase/firestore'
import {
  useFirebase, isLoaded, isEmpty
} from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import GoogleButton from 'react-google-button'
import { NavLink } from 'react-router-dom'
import KitchenIcon from '@material-ui/icons/Kitchen';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import SortIcon from '@material-ui/icons/Sort';
import MenuIcon from '@material-ui/icons/Menu';
import {
  CircularProgress, Hidden, Drawer, Divider,
  List, ListItem, ListItemIcon, ListItemText, withStyles, Theme,
  CssBaseline, AppBar, Toolbar, IconButton, Typography,
  Menu, MenuItem, Slide, useScrollTrigger, Avatar
} from '@material-ui/core';
import { RootState } from '../Model/reducer'

function UserIsAuthenticated({ children }: any) {
  const firebase = useFirebase()
  const auth = useSelector((state: RootState) => state.firebase.auth)
  function loginWithGoogle() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }
  if (!isLoaded(auth)) return <div><CircularProgress /></div>
  if (isEmpty(auth)) return <GoogleButton onClick={loginWithGoogle} />
  return children
}

interface HideOnScrollProps {
  children: ReactElement<any, any>,
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const drawerWidth = 200;

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '60%',
  },
});

function Layout(props: any) {
  const { classes, children } = props;
  const firebase = useFirebase()
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorLoginMenuEl, setAnchorLoginMenuEl] = useState<Element | null>(null);

  const closeLoginMenu = () => {
    setAnchorLoginMenuEl(null);
  }
  const logout = () => {
    firebase.logout()
    closeLoginMenu();
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  }

  const closeDrawer = () => {
    if (openDrawer) {
      setOpenDrawer(false);
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={NavLink} to="/recipes" onClick={closeDrawer}>
          <ListItemIcon><FastfoodIcon /></ListItemIcon>
          <ListItemText primary="Recipes" />
        </ListItem>
        <ListItem button component={NavLink} to="/lists" onClick={closeDrawer}>
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary="Shopping lists" />
        </ListItem>
        <ListItem button component={NavLink} to="/fridge" onClick={closeDrawer}>
          <ListItemIcon><KitchenIcon /></ListItemIcon>
          <ListItemText primary="Fridge" />
        </ListItem>
        <ListItem button component={NavLink} to="/ingredients" onClick={closeDrawer}>
          <ListItemIcon><SortIcon /></ListItemIcon>
          <ListItemText primary="Sections" />
        </ListItem>
      </List>
    </div>
  );

  const auth = useSelector((state: RootState) => state.firebase.auth)

  return <div className={classes.root}>
    <CssBaseline />
    <HideOnScroll {...props}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Easy shopping list
                </Typography>

          <div style={{ flexGrow: 1 }} />

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) => {
              setAnchorLoginMenuEl(event.currentTarget);
            }}
          >
            {auth.photoURL ?
              <Avatar alt={auth.displayName || ''} src={auth.photoURL} />
              : <AccountCircle />}
          </IconButton>

          <Menu
            id="customized-menu"
            anchorEl={anchorLoginMenuEl}
            keepMounted
            open={Boolean(anchorLoginMenuEl)}
            onClose={closeLoginMenu}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <MeetingRoom fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>

    <main className={classes.content}>
      <div className={classes.toolbar} ></div>
      {children}
    </main>
  </div>
}

const LayoutWithStyles = withStyles(styles)(Layout)

function CoreLayout(props: any) {
  const { children } = props;

  return (
    <UserIsAuthenticated >
      <LayoutWithStyles>{children}</LayoutWithStyles>
    </UserIsAuthenticated>
  );
}

export default CoreLayout
