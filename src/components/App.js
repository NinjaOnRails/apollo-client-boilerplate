import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import Header from './Header';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

const App = () => {
  return (
    <div className="container">
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/signup" exact component={SignupForm} />
          <Route path="/signin" exact component={SigninForm} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
