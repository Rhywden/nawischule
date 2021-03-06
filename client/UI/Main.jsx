import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { createStyles, Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import { withTracker } from 'meteor/react-meteor-data';

import loading from './Spinner';

const drawerWidth = 240;

const AdminMain = Loadable({loader: () => import('./admin/Main'), loading: loading});
const AnleitungenMain = Loadable({loader: () => import('./anleitungen/Main'), loading: loading});
const LoginMain = Loadable({loader: () => import('./login/Main'), loading: loading})
const RegisterMain = Loadable({loader: () => import('./login/Register'), loading: loading});
const Logout = Loadable({loader: () => import('./login/Logout'), loading: loading});
const AnschriebeMain = Loadable({loader: () => import('./anschriebe/Main'), loading: loading});
const UebungenMain = Loadable({loader: () => import('./uebungen/Main'), loading: loading});
const WoerterbuchMain = Loadable({loader: () => import('./woerterbuch/Main'), loading: loading});

const styles = (theme) => createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  flex: {
      flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  titleTopLeft: {
    display: "flex",
    minHeight: 64,
    flexGrow: 1,
    alignItems: 'flex-start',
    paddingLeft: 24,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleMainLink: {
    textDecoration: 'none',
    marginBottom: 4,
    color: 'rgba(0,0,0,0.54)',
    fontSize: '1.31rem',
    fontWeight: 500,
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    lineHeight: '1.16em',
    margin: 0,
    display: 'block'
  },
  titleSubLink: {
    textDecoration: 'none',
    marginBottom: 4,
    color: 'rgba(0,0,0,0.54)',
    fontSize: '0.75rem',
    fontWeight: 400,
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    lineHeight: '1.37em',
    margin: 0,
    display: 'block'
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const links = [
  {
    path: '/Admin',
    name: 'Admin'
  },
  {
    path: '/Login',
    name: 'Login'
  },
  {
    path: '/Anleitungen',
    name: 'Anleitungen'
  },
  {
    path: '/Anschriebe',
    name: 'Anschriebe'
  },
  {
    path: '/Uebungen',
    name: 'Übungen'
  },
  {
    path: '/Woerterbuch',
    name: 'Wörterbuch'
  },
  {
    path: '/Register',
    name: 'Registrierung'
  }
]

class MyDrawer extends React.Component {
  render() {
    const { classes, closeDrawer, isLoggedIn, isAdmin } = this.props;

    return(
      <div>
        <div className={classes.titleTopLeft}>
          <Link to="/" className={classes.titleMainLink}>Naturwissenschaft</Link>
          <a className={classes.titleSubLink} href="http://beruflicheschulehamburgharburg.de/">an der BS18</a>
        </div>
        <Divider />
        {isLoggedIn ?
          <>
            <Button component={props => <Link to="/Anleitungen" {...props} />} fullWidth onClick={closeDrawer}>Anleitungen</Button>
            <Divider />
            <Button component={props => <Link to="/Anschriebe" {...props} />} fullWidth onClick={closeDrawer}>Anschriebe</Button>
            <Divider />
            <Button component={props => <Link to="/Woerterbuch" {...props} />} fullWidth onClick={closeDrawer}>Wörterbuch</Button>
            <Divider />
            <Button component={props => <Link to="/Uebungen" {...props} />} fullWidth onClick={closeDrawer}>Übungen</Button>
            {isAdmin ?
              <>
                <Divider />
                <Button component={props => <Link to="/Admin" {...props} />} fullWidth onClick={closeDrawer}>Admin</Button>
              </>
            : ''}
          </>
          : '' }
      </div>
    )
  }
}

class MyLoginButton extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return(
      <Button 
        color="inherit" 
        component={props => <Link to={isLoggedIn ? '/Logout' : '/Login'} {...props} />} 
      >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
    )
  }
}

const ButtonContainer = withTracker((props) => {
  const userId = Meteor.userId();
  return {
    ...props,
    isLoggedIn: !!userId
  }
})(MyLoginButton);

const DrawerContainer = withTracker((props) => {
  const userId = Meteor.userId();
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', 'school');
  return {
      ...props,
      isLoggedIn: !!userId,
      isAdmin: !!isAdmin,
  }
})(MyDrawer);

class Main extends React.Component {
  state = {
      mobileOpen: false
  }

  handleDrawerToggle = () => {
      this.setState(state => ({mobileOpen: !state.mobileOpen}));
  }

  closeDrawer = () => {
    this.setState({mobileOpen: false});
  }

  setTitle = () => {
    let path = "";
    links.forEach(entry => {
      let found = this.props.location.pathname.indexOf(entry.path);
      if(found >= 0)
        path = entry.name;
    });
    return path;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    {this.setTitle()}
                </Typography>
                <ButtonContainer />
            </Toolbar>
        </AppBar>
        <Hidden mdUp>
            <Drawer
                variant="temporary"
                anchor={'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <DrawerContainer classes={classes} closeDrawer={this.closeDrawer} />
            </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
            <Drawer
                variant="permanent"
                open
                classes={{paper: classes.drawerPaper}}
            >
                <DrawerContainer classes={classes} closeDrawer={this.closeDrawer} />
            </Drawer>
        </Hidden>
        <main className={classes.content}>
            <div className={classes.toolbar} />
              <Switch>
                <Route path="/Admin" component={AdminMain} />
                <Route path="/Login" component={LoginMain} />
                <Route path="/Anleitungen" component={AnleitungenMain} />
                <Route path="/Anschriebe" component={AnschriebeMain} />
                <Route path="/Uebungen" component={UebungenMain} />
                <Route path="/Woerterbuch" component={WoerterbuchMain} />
                <Route path="/Logout" component={Logout} />
              </Switch>
        </main>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(Main));