import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import SpeechRecognition from '../speechRecognition/component';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Reading from 'reading/components/Reading';
import UserProfile from './UserProfile';
import Home from './Home';
import ReadingSearch from 'readingSearch/components/ReadingSearch';
import ReadingAdd from 'readingMessage/components/Add';
import ReadingEdit from 'readingMessage/components/Edit';

import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from 'semantic-ui-react';

// const routes = [
//   {
//     path: '/',
//     exact: true,
//     title: () => 'Home',
//     icon: 'home',
//     main: () => <h2>Home</h2>
//   },
//   {
//     path: '/readingSearch',
//     title: () => 'Reading Search',
//     icon: 'library_books',
//     main: () => {
//       const WrappedComponent = contentWrapper(ReadingSearch);
//       return <WrappedComponent />;
//     }
//   },
//   {
//     path: '/reading_add',
//     title: () => 'Add New Reading Message',
//     main: () => {
//       const WrappedComponent = contentWrapper(ReadingAdd);
//       return <WrappedComponent />;
//     }
//   },
//   {
//     path: '/reading_edit/:id',
//     title: () => 'Reading Edit',
//     main: () => {
//       const WrappedComponent = contentWrapper(ReadingEdit);
//       return <WrappedComponent />;
//     }
//   },
//   {
//     path: '/reading/:id',
//     title: () => 'Reading',
//     main: () => {
//       const WrappedComponent = contentWrapper(Reading);
//       return <WrappedComponent />;
//     },
//     toolbar: () => <SpeechRecognition />
//   }
// ];

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
      <div>
        {/* <CssBaseline />
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
        </main> */}
      </div>
    );
  }
}

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => {
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={visible}
      >
        <Menu.Menu position='right'>
          {leftItems.map(item => (
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: '100vh' }}
      >
        <Menu fixed='top' inverted>
          <Menu.Item>
            <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Menu position='right'>
            {rightItems.map(item => (
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed='top' inverted>
    <Menu.Item>
      <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
    </Menu.Item>
    {leftItems.map(item => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position='right'>
      {rightItems.map(item => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: '5em' }}>{children}</Container>
);

const NavBar = ({ leftItems, rightItems, children }) => {
  const [visible, setVisible] = useState(false);

  const handlePusher = () => {
    if (visible) setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
    </div>
  );
};

const leftItems = [
  { as: 'a', content: 'Home', key: 'home' },
  { as: 'a', content: 'Users', key: 'users' }
];
const rightItems = [
  { as: 'a', content: 'Login', key: 'login' },
  { as: 'a', content: 'Register', key: 'register' }
];

export default () => {
  return (
    <NavBar leftItems={leftItems} rightItems={rightItems}>
      content
      {/* <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' /> */}
    </NavBar>
  );
};
