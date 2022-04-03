import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
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
  };
  useEffect(() => {
    
    if (getUserToken === undefined || getUserToken === null || getUserToken === "") {
      history.push("/");
    }
    else{
      history.push("/home");
    }
  }, [getUserToken,history]);
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
                      style={{ height: "80vh" }}
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
                            <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              onChange={(event) => setPassword(event.target.value)}
                            />
                             <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
                          </div>

                          <button
                          onClick={loginSubmit}
                            className="btn btn-primary btn-user btn-block"
                          >
                            Login
                          </button>
                        </form>

                        <div className="text-center">
                                        <Link className="small" to="/signup">Create an Account!</Link>
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

export default Login;
