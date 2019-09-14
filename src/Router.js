import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Components
import Login from './pages/Login';
import Main from './pages/Main';
//import Pagina404 from "./Pagina404/Pagina404";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main" component={Main} />
      <Redirect from="/*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;
