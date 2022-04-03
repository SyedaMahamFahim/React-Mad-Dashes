import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const history = useHistory();
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

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    if (handleValidation()) {
      global.token = email;
      global.auth = true;

      localStorage.setItem("token", global.token);

      console.log(global.token + global.auth);
    }

    if (handleValidation()) {
      // signup();

      if (handleValidation()) {
        axios
          .post("http://165.227.123.50:5000/api/signup/", {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log("after login success", res.data);
            history.push("/home");
          })
          .catch((err) => {
            alert(err.response.data.message);
            console.log("login Error", err.response.data.message);
          });
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
  };

  return (
    <>
      <div className="bg-gradient-primary" style={{ height: "100vh" }}>
        <div className="container">
          {/* <!-- Outer Row --> */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div
                    className="row"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="col-lg-6 d-none d-lg-block bg-login-image"
                      style={{
                        height: "80vh",
                        backgroundImage: `url('https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')`,
                      }}
                    ></div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              onChange={(event) => setEmail(event.target.value)}
                            />
                            <small
                              id="emailHelp"
                              className="text-danger form-text"
                            >
                              {emailError}
                            </small>
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                            <small
                              id="passworderror"
                              className="text-danger form-text"
                            >
                              {passwordError}
                            </small>
                          </div>

                          <button
                            onClick={loginSubmit}
                            className="btn btn-primary btn-user btn-block"
                          >
                            Submit
                          </button>
                        </form>
                        <div className="text-center">
                          <Link className="small" to="/">
                            Login
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
