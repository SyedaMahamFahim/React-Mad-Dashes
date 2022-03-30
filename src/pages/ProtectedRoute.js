import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const getUserToken = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (getUserToken === null || getUserToken === undefined || getUserToken === "") {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
