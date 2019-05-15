import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Reading from 'reading/components/Reading';
import Add from 'readingMessage/components/Add';
import Edit from 'readingMessage/components/Edit';
import ReadingSearch from 'readingSearch/components/ReadingSearch';
import Home from 'layout/Home';
import { PrivateRoute } from './components/PrivateRoute';
import SignIn from 'settings/components/SignIn';
import SignUp from 'settings/components/SignUp';
import AuthRedux from 'settings/components/AuthRedux';
import SignConfirm from 'settings/components/SignConfirm';

export const Routes = () => (
  <BrowserRouter>
    <AuthRedux />
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route path='/sign_in' component={SignIn} />
      <Route path='/sign_up' component={SignUp} />{' '}
      <Route path='/sign_confirm' component={SignConfirm} />
      <PrivateRoute path='/reading/:id' component={Reading} />
      <PrivateRoute path='/reading_add' component={Add} />
      <PrivateRoute path='/reading_edit/:id' component={Edit} />
      <PrivateRoute path='/reading_search' component={ReadingSearch} />
    </Switch>
  </BrowserRouter>
);
