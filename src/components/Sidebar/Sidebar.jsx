import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sendDataToParent, toggleParent }) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
    sendDataToParent(toggle);
  };
  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          toggleParent ? "toggled" : ""
        }`}
        id="accordionSidebar"
      >
       
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
          Mad Dashes 
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link to="/home" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Pages</div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item"></li>

        {/* <!-- Nav Item - Add Device --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/addDevice">
            <i className="fas fa-fw fa-solid fa-microchip"></i>
            <span>Add Device</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Play Schedule --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/laserSchedule">
            <i className="fas fa-fw fa-table"></i>
            <span>Play Schedule</span>
          </Link>
        </li>

        {/* <!-- Nav Item - Draw --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/draw">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Draw</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div
          className="text-center d-none d-md-inline"
          //   onClick={() => setToggle(!toggle)}
          onClick={toggleHandler}
        >
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>

       
      </ul>
    </>
  );
};

export default Sidebar;
