import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Reading from 'reading/components/Reading';
import Add from 'readingMessage/components/Add';
import Edit from 'readingMessage/components/Edit';
import ReadingSearch from 'readingSearch/components/ReadingSearch';
import Home from 'layout/Home';
import PrivateRoute from './components/PrivateRoute';
import SignIn from 'settings/components/SignIn';
import SignUp from 'settings/components/SignUp';
import GenericNotFound from 'layout/GenericNotFound';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route path='/sign_in' component={SignIn} />
      <Route path='/sign_up' component={SignUp} />
      <PrivateRoute path='/reading/:id' component={Reading} />
      <PrivateRoute path='/reading/' component={ReadingSearch} />
      <PrivateRoute path='/reading_add' component={Add} />
      <PrivateRoute path='/reading_edit/:id' component={Edit} />
      <Route component={GenericNotFound} />
    </Switch>
  </BrowserRouter>
);
