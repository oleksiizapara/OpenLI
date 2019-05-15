import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

export const HeaderMenu = () => {
  render() {
    const headerIcon = <Icon name={this.props.headerIcon} size="large" />;

    let menuItems = [];
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].length !== 2) {
        console.error('HeaderMenu: items format should be ["name", "route"]');
        break;
      }
      const name = this.props.items[i][0];
      const route = this.props.items[i][1];
      menuItems.push(
        <Menu.Item
          key={"item-" + i}
          index={i}
          as={Link}
          to={route}
          header={i === 0}
          active={route === this.props.location.pathname}
        >
          {i === 0 ? headerIcon : ""}
          {name}
        </Menu.Item>
      );
    }

    return (
      <Menu fixed="top" inverted>
        <Container>{menuItems}</Container>
      </Menu>
    );
  }
}

HeaderMenu.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  headerIcon: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
};

export default withRouter(HeaderMenu);
