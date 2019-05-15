import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Image, Menu, Sidebar } from 'semantic-ui-react';
import LogoMenuItem from './LogoMenuItem';

export const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
  rightIcons
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
            // eslint-disable-next-line react/jsx-key
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
            <LogoMenuItem />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Menu position='right'>
            {rightItems.map(item => (
              // eslint-disable-next-line react/jsx-key
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
          {rightIcons}
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

NavBarMobile.propTypes = {
  children: PropTypes.object,
  leftItems: PropTypes.array,
  onPusherClick: PropTypes.func,
  onToggle: PropTypes.func,
  rightItems: PropTypes.array,
  visible: PropTypes.bool,
  rightIcons: PropTypes.object
};
