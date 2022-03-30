import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const history = useHistory();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }
    if (password.length < 6 || password.length > 40) {
      formIsValid = false;
      setpasswordError(
        "Please type password greater then 6 characters and less than 40 characters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    if (handleValidation()) {
      global.token = email;
      global.auth = true;

      localStorage.setItem("token", global.token);

      console.log(global.token + global.auth);

      history.push("/login");
    }

    if (handleValidation()) {
      // signup();

      if (handleValidation()) {
        axios.post('http://165.227.123.50:5000/api/signup/', {
          email: email,
          password: password
        }).then(res => {
          console.log("after login success", res.data)
        }).catch(err => {
          console.log("login Error", err.response)
        })
      }
    }
  };

  const signup = () => {

    // fetch('http://165.227.123.50:5000/api/signup/', {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: email,
    //         password: password,
    //     })
    // });


    window.alert("Signup Successful");
  }

  return (
    <Container className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <Card className="col-md-4" style={{ marginTop: '2%' }}>
            <legend>
              <Card.Title style={{ marginTop: '1%' }}>Register Account</Card.Title>
            </legend>
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                {/* <label>Email address</label> */}
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group" style={{ marginTop: '2%' }}>
                {/* <label>Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              {/* <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div> */}
              <button style={{ marginTop: '2%', marginBottom: '2%' }} type="submit" className="btn btn-primary">
                Signup
              </button>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}
export default Signup;
