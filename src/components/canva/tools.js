import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen, faUndo } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-input-slider";

const Tools = ({
  handleToolChange,
  brushRadius,
  setBrushRadius,
  canvasRef
}) => {
  const [eraserSize, setEraserSize] = useState(30);
  const [brushSize, setBrushSize] = useState(30);
  useEffect(() => {
    setEraserSize(brushRadius);
    setBrushSize(brushRadius);
  }, []);
  return (
    <div style={{ boxShadow: "none", marginLeft: '43%' }}>
      <div className="slider-container">
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faEraser}
            onClick={() => {
              handleToolChange("eraser");
              setBrushRadius(eraserSize);
            }}
          />
        </div>
        <Slider
          axis="x"
          x={eraserSize * -1 + 61}
          xmin={1}
          xmax={60}
          onChange={({ x }) => {
            setBrushRadius(x * -1 + 61);
            setEraserSize(x * -1 + 61);
          }}
          onDragEnd={() => {
            handleToolChange("eraser");
          }}
        />
                <p style={{ marginBottom: 0, marginTop: "1px" }}>{eraserSize}</p>

      </div>

      <div className="slider-container">
        <div className="icon-container">
          <FontAwesomeIcon
            onClick={() => handleToolChange("pen", brushSize)}
            icon={faPen}
          />
        </div>
        <Slider
          axis="x"
          x={brushSize * -1 + 61}
          xmin={1}
          xmax={60}
          onChange={({ x }) => {
            setBrushRadius(x * -1 + 61);
            setBrushSize(x * -1 + 61);
          }}
          onDragEnd={() => {
            handleToolChange("pen");
          }}
        />
        <p style={{ marginBottom: 0, marginTop: "1px" }}>{brushSize}</p>
      </div>
      {/* <FontAwesomeIcon icon={faUndo} onClick={() => canvasRef.current.undo()} /> */}
    </div>
  );
};

export default Tools;
