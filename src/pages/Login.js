import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const history = useHistory();
  const getUserToken = localStorage.getItem("token");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
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

  const loginSubmit = async (e) => {
    e.preventDefault();
    handleValidation();

    // login();

    if (handleValidation()) {
      axios
        .post("http://165.227.123.50:5000/api/login/", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log("after login success", res.data);

          global.token = email;
          localStorage.setItem("token", global.token);
          console.log(global.token);

          history.push("/home");
        })
        .catch((err) => {
          console.log("login Error", err.response);
          alert(
            "We do not recognize that password / email, please make sure the details are correct and try again"
          );
        });
    }

    // console.log(resp);

    // axios.post('http://165.227.123.50:5000/api/login', {
    //   params: {
    //     email: "faizkhan2811997@gmail.com",
    //     password: "FaizKhan"
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   }}).then((response) => {
    //   console.log(response.data);
    // });

    //   if(true) {
    //     // login();

    // try {
    //   let response = await fetch('http://165.227.123.50:5000/api/login/', {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json"
    //     },
    //     body: JSON.stringify({
    //       email: 'faizkhan2811997@gmail.com',
    //       password: 'FaizKhan'
    //     })
    //   })
    //   console.log(response);
    //   let result = response.json();
    //   if (response.ok) {
    //     console.log("login successful");
    //     window.alert("login succesful");
    //   } else {
    //     console.log("login failed");
    //     window.alert("login failed");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // }
  };

  useEffect(() => {
    
    if (getUserToken === undefined || getUserToken === null || getUserToken === "") {
      history.push("/");
    }
    else{
      history.push("/home");
    }
  }, [getUserToken,history]);

  // async function login() {
  //   let item = { email, password };

  //   console.log(item);

  //   let resp = await fetch ('http://165.227.123.50:5000/api/login', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(item)
  //   })

  //   resp = await resp.json();
  //   console.log(resp.ok);
  // }

  return (
    <Container className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <Card className="col-md-4" style={{ marginTop: "2%" }}>
            <legend>
              <Card.Title style={{ marginTop: "1%" }}>Login</Card.Title>
            </legend>
            <form id="loginform">
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
              <div className="form-group" style={{ marginTop: "2%" }}>
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
              <a
                href="/home"
                style={{ marginTop: "2%", marginBottom: "2%" }}
                onClick={loginSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </a>
            </form>
            <Link to="/signup" style={{ marginBottom: "2%" }}>Signup</Link>
           
          </Card>
        </div>
      </div>
    </Container>
  );
}
export default Login;
