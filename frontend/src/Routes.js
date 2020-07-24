import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./user/login";
import App from "./user/App";
import Home from "./user/home";
import PrivateRoute from "./todos/privateroute";
import Todos from "./todos/todos";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={App} />
        <Route path="/login" exact component={Login}></Route>
        <PrivateRoute path="/login/todos" exact component={Todos}></PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
