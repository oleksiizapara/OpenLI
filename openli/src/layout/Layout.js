import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import SpeechRecognition from '../speechRecognition/component';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Reading from '../reading/components/Reading';
import UserProfile from './UserProfile';
import Home from './Home.js';
import ReadingSearch from '../readingSearch/components/ReadingSearch';
import ReadingAdd from '../readingMessage/components/Add';
import ReadingEdit from '../readingMessage/components/Edit';
import { contentWrapper } from './contentWrapper';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing(2)
  }
});

const routes = [
  {
    path: '/',
    exact: true,
    title: () => 'Home',
    icon: 'home',
    main: () => <h2>Home</h2>
  },
  {
    path: '/readingSearch',
    title: () => 'Reading Search',
    icon: 'library_books',
    main: () => {
      const WrappedComponent = contentWrapper(ReadingSearch);
      return <WrappedComponent />;
    }
  },
  {
    path: '/reading_add',
    title: () => 'Add New Reading Message',
    main: () => {
      const WrappedComponent = contentWrapper(ReadingAdd);
      return <WrappedComponent />;
    }
  },
  {
    path: '/reading_edit/:id',
    title: () => 'Reading Edit',
    main: () => {
      const WrappedComponent = contentWrapper(ReadingEdit);
      return <WrappedComponent />;
    }
  },
  {
    path: '/reading/:id',
    title: () => 'Reading',
    main: () => {
      const WrappedComponent = contentWrapper(Reading);
      return <WrappedComponent />;
    },
    toolbar: () => <SpeechRecognition />
  }
];

class Layout extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.title}
                />
              ))}
            </Typography>
            {routes.map(
              (route, index) =>
                route.toolbar && (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.toolbar}
                  />
                )
            )}
            <UserProfile />
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {routes.map(
              (route, index) =>
                route.icon && (
                  <ListItem key={index} button component={Link} to={route.path}>
                    <ListItemIcon>
                      <Icon>{route.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={route.title()} />
                  </ListItem>
                )
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
