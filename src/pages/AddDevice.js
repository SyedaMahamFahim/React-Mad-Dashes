import React, { Component } from "react";
import axios from "axios";
import AppWrapper from "../wrapper/AppWrapper";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import PageHeading from "../components/PageHeading/PageHeading";
import DetailCard from "../components/DetailCard/DetailCard";

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      device: "",
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ userToken: token });
    console.log("token : " + this.state.userToken);
  }

  handleChange = (event) => {
    this.setState({ device: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      Device: this.state.device,
      email: this.state.userToken,
    };

    localStorage.setItem("device", user.Device);

    if (user.Device == "") {
      console.log("Enter Device");
      alert("Enter Device");
    } else if (user.email == "") {
      console.log("Please Login First");
      alert("Please Login First");
    } else {
      axios
        .post(`http://165.227.123.50:5000/api/addDevice/`, user)
        .then((res) => {
          if (res.status == 200) {
            console.log("Device Added Successfully");
            alert("Device Added Successfully");
          } else {
            alert("Signup Failed");
          }
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <PageHeading title={"Add Device"} />
        </div>
        <div className="container mt-5">
          <div className="row">
            <DetailCard
              title={"Add Device-Insturction"}
              desc={
                "This card uses Bootstrap's default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example."
              }
            />
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Enter your SSID</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <Button type="submit" variant="primary" className="mt-4">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* <Container>
          <h3>
            <Badge bg="secondary">Add Device</Badge>
          </h3>

          <form onSubmit={this.handleSubmit}>
            <div style={{ marginTop: "4%" }}>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="input your ssid"
              />
            </div>

            <div style={{ marginTop: "2%" }}>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </div>
          </form>
        </Container> */}
      </>
    );
  }
}

export default AppWrapper(AddDevice);
