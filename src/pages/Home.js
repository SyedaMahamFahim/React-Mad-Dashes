import React, { Component } from "react";

import AppWrapper from "../wrapper/AppWrapper";
import PageHeading from "../components/PageHeading/PageHeading";
import CardBox from "../components/CardBox/CardBox";
import DetailCard from "../components/DetailCard/DetailCard";

const detailCardBox = [
  {
    id: 0,
    title: "Add Device",
    desc: "This card uses Bootstrap's default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example.",
  },
  {
    id: 1,
    title: "Play Schedule",
    desc: "This card uses Bootstrap's default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example.",
  },
  {
    id: 2,
    title: "Draw",
    desc: "This card uses Bootstrap's default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example.",
  },
];

const cardBoxContent=[
  {
    id:0,
    title:"Add Device",
    url:"/addDevice",
    classTitle:"primary",
    iconName:"fa-solid fa-microchip",
  },
  {
    id:1,
    title:"Play Schedule",
    url:"/laserSchedule",
    classTitle:"success",
    iconName:"fa-table",
  },
  {
    id:2,
    title:"Draw",
    url:"/draw",
    classTitle:"info",
    iconName:"fa-chart-area",
  }
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    this.setState({ userToken: token });
    console.log("token : " + this.state.userToken);
  }


  render() {
    return (
      <>
        <div className="container-fluid">
          <PageHeading title={"Dashboard"} />
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-center">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  <span className="text-gray-800">User</span>:{" "}
                  {this.state.userToken}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {
            cardBoxContent.map((data,index)=><CardBox 
            title={data.title}
            url={data.url}
            classTitle={data.classTitle}
            iconName={data.iconName} 
            key={index}/>)
          }
         
        </div>

        <div className="container">
          <div className="row mt-5 home-row">
            {detailCardBox.map((data, index) => (
              <DetailCard key={index} title={data.title} desc={data.desc} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default AppWrapper(Home);
