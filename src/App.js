import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import AddDevice from "./pages/AddDevice";
import LaserSchedule from "./pages/Schedule";
import Draw from "./pages/Draw";

import Login from "./pages/Login";
import Signup from "./pages/Register";

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute exact path="/addDevice" component={AddDevice} />
      <ProtectedRoute exact path="/laserSchedule" component={LaserSchedule} />
      <ProtectedRoute exact path="/draw" component={Draw} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}

export default App;
