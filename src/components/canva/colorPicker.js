import React from "react";
import { CompactPicker, GithubPicker } from "react-color";

const ColorPicker = React.memo(({ brushColor, handleColorChange }) => {
  return (
    <CompactPicker
      // width="200px"
      color={['#D9E3F0']}//, '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
      onChangeComplete={handleColorChange}
    />
  );
})
export default ColorPicker;
