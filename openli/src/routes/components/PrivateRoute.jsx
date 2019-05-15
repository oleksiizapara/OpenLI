import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

import { selectors } from 'settings/reducer';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => selectors.user(state));

  return (
    <Route
      {...rest}
      render={props =>
        user !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect to='/sign_in' />
        )
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.any
};
