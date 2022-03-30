import React,{useState} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
const AppWrapper = (Components) => function HOC(){
  const [toggle, setToggle] = useState(false)

  const sendDataToParent = (toggleValue) => { 
    setToggle(toggleValue);
  };
  return (
    <>

      <div id="wrapper">
        <Sidebar sendDataToParent={sendDataToParent} toggleParent={toggle} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar sendDataToParent={sendDataToParent}/>
            <div className="container-fluid"><Components/> </div>
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppWrapper;
