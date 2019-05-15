import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react';
import LogoMenuItem from './LogoMenuItem';

export const NavBarDesktop = ({ leftItems, rightItems, rightIcons }) => {
  return (
    <Menu fixed='top' inverted>
      <Menu.Item>
        <LogoMenuItem />
      </Menu.Item>
      {leftItems.map(item => (
        // eslint-disable-next-line react/jsx-key
        <Menu.Item {...item} />
      ))}
      <Menu.Menu position='right'>
        {rightItems.map(item => (
          // eslint-disable-next-line react/jsx-key
          <Menu.Item {...item} />
        ))}
      </Menu.Menu>
      {rightIcons}
    </Menu>
  );
};

NavBarDesktop.propTypes = {
  leftItems: PropTypes.array,
  rightItems: PropTypes.array,
  rightIcons: PropTypes.object
};
