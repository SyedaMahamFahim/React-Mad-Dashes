import React, { Component } from "react";
import axios from "axios";
import AppWrapper from "../wrapper/AppWrapper";
import PageHeading from "../components/PageHeading/PageHeading";
import Button from "react-bootstrap/Button";

import Dropdown from "react-bootstrap/Dropdown";

import DayPickerInput from "react-day-picker/DayPickerInput";
import { format } from 'date-fns';

import "react-day-picker/lib/style.css";
import TimePicker from "react-time-picker";

//TEST
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const DAYS = [
  {
    key: "sunday",
    label: "S",
  },
  {
    key: "monday",
    label: "M",
  },
  {
    key: "tuesday",
    label: "T",
  },
  {
    key: "wednesday",
    label: "W",
  },
  {
    key: "thursday",
    label: "T",
  },
  {
    key: "friday",
    label: "F",
  },
  {
    key: "saturday",
    label: "S",
  },
];

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: "#0d6efd",
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    color: "#0d6efd",

    "&$selected": {
      color: "white",
      background: "#0d6efd",
      border: "none",
    },
    "&:hover": {
      border: "none",
      background: "#0d6efd",
      color: "white",
    },
    "&:hover$selected": {
      borderColor: "white",
      background: "#BA9BC3",
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
    outline: "none",
  },
  selected: {},
})(ToggleButton);

class LaserSchedule extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      startTime: "",
      endTime: "",
      userToken: "",
      Device: "",
      Date: "",
      Sound: "",
      speed: "",
      Status: false,
      pattern: "pattern1",
      Day: [0, 2, 4],
    };
  }


  handleSubmit = (event) => {
    console.log(this.state.userToken);
    console.log(this.state.Device);
    console.log("Date : " + JSON.stringify(this.state.Date));
    alert("Date : " + JSON.stringify(this.state.Date));
    alert("Date : " + JSON.stringify(this.state.Date).slice(1, 5));
    alert("Date : " + JSON.stringify(this.state.Date).slice(6, 8));
    alert("Date : " + JSON.stringify(this.state.Date).slice(9, 11));
    console.log(this.state.selectedValue);
    console.log(this.state.selectedValue1);
    console.log(this.state.Sound);
    console.log(this.state.Status);

    if (this.state.userToken == "") {
      console.log("Please login first");
      alert("Please login first");
    } else {
      axios
        .post(`http://165.227.123.50:5000/api/addSchedule`, {
          Device: this.state.Device,
          Date: {
            Year: JSON.stringify(this.state.Date).slice(1, 5),
            Month: JSON.stringify(this.state.Date).slice(6, 8),
            Day: JSON.stringify(this.state.Date).slice(9, 11),
          },
          Start_Time: this.state.startTime,
          End_Time: this.state.endTime,
          Pattern: this.state.pattern,
          Sound: this.state.Sound,
          Speed: this.state.speed,
          Status: this.state.Status,
          Day: this.state.Day,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Saved Successful");
            alert("Saved Successful");
          } else {
            alert("Procedure Failed");
          }
          console.log(res);
          console.log(res.data);
        });
    }
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <PageHeading title={"Set Laser Schedule"} />
        </div>

        <div className="container mt-5 card">
          <div className="row">
            <div className="col m-4">
              <div className="form-group m-4 mx-1">
                <h5>Select The Pattern</h5>
                <select
                  className="form-control"
                  onChange={(e) => this.setState({ pattern: e.target.value })}
                >
                  <option value="pattern1">Pattern 1</option>
                  <option value="pattern2">Pattern 2</option>
                  <option value="pattern3">Pattern 3</option>
                </select>
                {this.state.pattern}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group mx-4">
                <h5>Select Date</h5>

                <DayPickerInput
                  onDayChange={(day)=>this.setState({ Date: day })}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group mx-3">
                <h5>Start Time</h5>

                <TimePicker
                  onChange={(value) => this.setState({ startTime: value })}
                  autoFocus={true}
                />
                {this.state.startTime}
              </div>
            </div>
            <div className="col">
              <div className="form-group mx-3">
                <h5>End Time</h5>
                <TimePicker
                  onChange={(value) => this.setState({ endTime: value })}
                  autoFocus={true}
                />

                {this.state.endTime}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mx-4 my-3">
                <h5>Sound Congfiguration</h5>
                <div>
                  <input
                    type="radio"
                    value="On"
                    name="sound"
                    onChange={() => this.setState({ Sound: "on" })}
                  />{" "}
                  Sound On
                  <br />
                  <input
                    type="radio"
                    value="Off"
                    name="sound"
                    onChange={() => this.setState({ Sound: "off" })}
                  />{" "}
                  Sound Off <br />
                  {this.state.Sound}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mx-4 my-3">
                <div>
                  <h5>Select speed of motor</h5>
                  <input
                    type="radio"
                    value="Slow"
                    name="Speed"
                    onChange={(e) => this.setState({ speed: "Slow" })}
                  />{" "}
                  Slow
                  <br />
                  <input
                    type="radio"
                    value="Medium"
                    name="Speed"
                    onChange={(e) => this.setState({ speed: "Medium" })}
                  />{" "}
                  Medium
                  <br />
                  <input
                    type="radio"
                    value="Fast"
                    name="Speed"
                    onChange={(e) => this.setState({ speed: "Fast" })}
                  />{" "}
                  Fast <br />
                  {this.state.speed}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mx-4 my-3">
                <h5>Select days to repeat (if any)</h5>

                <StyledToggleButtonGroup
                  size="small"
                  arial-label="Days of the week"
                  value={this.state.Day}
                  onChange={(event, value) => this.setState({ Day: value })}
                >
                  {DAYS.map((day, index) => (
                    <StyledToggle
                      key={day.key}
                      value={index}
                      aria-label={day.key}
                    >
                      {day.label}
                    </StyledToggle>
                  ))}
                </StyledToggleButtonGroup>
                {this.state.Day}

                <Dropdown style={{ marginTop: "0.5%", marginBottom: "0.5%" }}>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Repeat Schedule
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        this.setState({ Status: false });
                      }}
                    >
                      Every week
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        this.setState({ Status: true });
                      }}
                    >
                      Every Week After
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* {console.log(this.state.Status)} */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col mx-4 my-3">
              <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
                Save Pattern
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AppWrapper(LaserSchedule);
