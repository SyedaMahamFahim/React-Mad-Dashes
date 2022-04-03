import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../Context/GV";
import CanvasDraw from "react-canvas-draw";
import Tools from "./tools.js";
import Card from "react-bootstrap/Card";
import "./styles.css";

export default function Canvas() {
  const [brushColor, setBrusholor] = useState("#444");
  const [lastPenColor] = useState("#444");
  const [canvasImage] = useState("");
  const [brushRadius, setBrushRadius] = useState(10);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  const toolChange = React.useCallback(
    (tool) => {
      if (tool === "eraser") {
        setBrusholor("#ffffff");
      }
      if (tool === "pen") {
        setBrusholor(lastPenColor);
      }
    },
    [lastPenColor]
  );

  const saveData = () => {
    const data = canvasRef.current.getSaveData();
    const list = JSON.parse(data);

    let xcoord = [];
    let ycoord = [];
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
      var value = parseInt((element / xmax) * 180);
      x.push(value);
      global.xcord.push(value);
    });

    ycoord.forEach((element) => {
      var value = parseInt((element / ymax) * 180);
      y.push(value);
      global.ycord.push(value);
    });

    console.log(global.xcord);
    console.log(global.ycord);

    canvasRef2.current.loadSaveData(data);
  };

  return (
    <div className="App">
      <div>
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
