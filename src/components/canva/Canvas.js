import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "../Context/GV";

// import axios from "axios";
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "./colorPicker";
// import images from "./images";
import Tools from "./tools.js";

import Card from "react-bootstrap/Card";

import "./styles.css";

export default function Canvas() {
  const [brushColor, setBrusholor] = useState("#444");
  const [lastPenColor, setLastPenColor] = useState("#444");
  const [canvasImage, setCanvassImage] = useState("");
  const [brushRadius, setBrushRadius] = useState(10);
  // const [savedData, setSavedData] = useState('');

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  //   useEffect(() => {
  //     setCanvassImage(images[1].largeImageURL);
  //   }, []);
  const handleColorChange = React.useCallback((color) => {
    const {
      rgb: { r, g, b, a },
    } = color;
    setBrusholor(`rgba(${r}, ${g}, ${b},${a})`);
    setLastPenColor(`rgba(${r}, ${g}, ${b},${a})`);
  }, []);
  const toolChange = React.useCallback(
    (tool, size) => {
      if (tool === "eraser") {
        setBrusholor("#ffffff");
      }
      if (tool === "pen") {
        setBrusholor(lastPenColor);
      }
    },
    [lastPenColor]
  );
  //   const handleChangeImage = id => {
  //     const newImage = images.find(item => id === item.id);
  //     setCanvassImage(newImage.largeImageURL);
  //     canvasRef.current.clear();
  //   };
  const saveData = () => {
    const data = canvasRef.current.getSaveData();
    const list = JSON.parse(data);
    // let slidersValue = [{x: global.axis0, y: global.axis1}]

    let xcoord = [];
    let ycoord = [];
    // global.canvasPoints.push(slidersValue,list.lines[0].points);
    const points = list.lines[0].points;

    points.forEach((element) => {
      xcoord.push(parseInt(element.x));
      ycoord.push(parseInt(element.y));
    });

    var xmax = Math.max(...xcoord);
    var ymax = Math.max(...ycoord);

    let x = [];
    let y = [];

    xcoord.forEach((element) => {
      // console.log(xmax);
      // console.log(element);
      var value = parseInt((element / xmax) * 180);
      x.push(value);
      global.xcord.push(value);
    });

    ycoord.forEach((element) => {
      // console.log(xmax);
      // console.log(element);
      var value = parseInt((element / ymax) * 180);
      y.push(value);
      global.ycord.push(value);
    });

    console.log(global.xcord);
    console.log(global.ycord);

    let coordinates = [{ x: x, y: y }];
    // console.log(coordinates[0]);
    // console.log(points);
    // window.alert("Coordinates are saved : "+list);
    canvasRef2.current.loadSaveData(data);
  };

  return (
    <div className="App">
      {/* <div className="previews-wrapper">
        {images.map(picture => (
          <div
            key={picture.id}
            onClick={() => handleChangeImage(picture.id)}
            className="preview-container"
          >
            <img
              className="preview-image"
              src={picture.previewURL}
              key={picture.id}
              alt={picture.tag}
            />
          </div>
        ))}
      </div> */}
      <div style={{}}>
        <Card className="row col-md-12 justify-content-center">
          <Tools
            setBrushRadius={setBrushRadius}
            handleToolChange={toolChange}
            canvasRef={canvasRef}
            brushRadius={brushRadius}
          />
        </Card>
        <Card className="canvass-container mt-5">
          <img className="overlay-image" src={canvasImage} alt="" />
          <CanvasDraw
            ref={canvasRef}
            brushColor={brushColor}
            brushRadius={brushRadius}
            lazyRadius={5}
          />

          <button
            onClick={saveData}
            style={{
              color: "#fff",
              backgroundColor: "#0d6efd",
              borderColor: "#0d6efd",
              padding: "5px 10px",
            }}
            className="btn btn-primary"
          >
            {" "}
            Save Pattern{" "}
          </button>
        </Card>

        {/* <Card className="canvass-container2">
          <img
            src={canvasImage}
            alt="hey"
            style={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              maxHeight: "100%",

              zIndex:9999
            }}
          />
          <CanvasDraw className="overlay-image" ref={canvasRef2} canvasWidth={200} canvasHeight={200} />
        </Card> */}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Canvas />, rootElement);
