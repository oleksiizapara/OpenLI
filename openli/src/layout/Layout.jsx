import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { NavBar } from './NavBar';

export const leftItems = [
  { as: Link, content: 'Home', key: 'home', to: '/', active: true },
  { as: Link, content: 'Reading', key: 'reading', to: '/reading_search' },
  { as: Link, content: 'Progress', key: 'progress', to: '/progress' },
  {
    as: Link,
    content: 'Settings',
    key: 'settings',
    to: '/settings'
  }
];

export const UserInfoDropDown = () => {
  return (
    <Dropdown item icon='user' direction='left'>
      <Dropdown.Menu>
        <Dropdown.Item>Electronics</Dropdown.Item>
        <Dropdown.Item>Automotive</Dropdown.Item>
        <Dropdown.Item>Home</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const rightItems = [
  { as: Link, content: 'Sign In', key: 'sign_in', to: '/sign_in' },
  { as: Link, content: 'Sign Up', key: 'sign_up', to: '/sign_up' }
];

export const Layout = ({ leftItems, rightItems, children, rightIcons }) => {
  return (
    <NavBar
      leftItems={leftItems}
      rightItems={rightItems}
      rightIcons={rightIcons}
    >
      {children}
    </NavBar>
  );
};

export default Layout;

Layout.propTypes = {
  leftItems: PropTypes.array,
  rightItems: PropTypes.array,
  children: PropTypes.object,
  rightIcons: PropTypes.object
};
