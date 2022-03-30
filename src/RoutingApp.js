import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Home from "./pages/Home";
import AddDevice from "./pages/AddDevice";
import LaserSchedule from "./pages/Schedule";
import Draw from "./pages/Draw";

import Login from "./pages/Login";
import Signup from "./pages/Register";
import DemoIndex from "./pages/DemoIndex";

function App() {
  
  return (
    
      
      <div className="App">
        <Router> 
          <Switch>       
                  
                  <Route path="/addDevice" component={AddDevice} />
                  <Route path="/laserSchedule" component={LaserSchedule} />
                  <Route path="/draw" component={Draw} />
                
                  <Route path="/signup" component={Signup} />
                  <Route path="/index" component={DemoIndex} />
                  
                  <Route path="/home" component={Home} />

                  <Route component={Login} /> 
          </Switch>
        </Router>
      </div>
     
    
  );
}

export default App;
