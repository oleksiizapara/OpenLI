import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Reading from 'reading/components/Reading';
import ReadingSearch from 'readingSearch/components/ReadingSearch';
import Home from 'layout/Home';
import PrivateRoute from './components/PrivateRoute';
import GenericNotFound from 'layout/GenericNotFound';
import EditPage from 'readingMessage/components/EditPage';
import CreatePage from 'readingMessage/components/CreatePage';
import SignInPage from 'settings/components/SignInPage';
import SignUpPage from 'settings/components/SignUpPage';
import RecoveryPasswordPage from 'settings/components/RecoveryPasswordPage';
import ReadingListPage from 'readingList/components/ReadingListPage';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path='/' component={Home} />
      <Route path='/sign_in' component={SignInPage} />
      <Route path='/sign_up' component={SignUpPage} />
      <Route path='/recovery_password' component={RecoveryPasswordPage} />
      <PrivateRoute path='/reading/:id' component={Reading} />
      <PrivateRoute path='/reading/' component={ReadingSearch} />
      <PrivateRoute path='/reading_add' component={CreatePage} />
      <PrivateRoute path='/reading_edit/:id' component={EditPage} />
      <PrivateRoute path='/reading_list' component={ReadingListPage} />
      <Route component={GenericNotFound} />
    </Switch>
  </BrowserRouter>
);
