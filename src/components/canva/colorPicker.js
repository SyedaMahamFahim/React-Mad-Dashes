import React from "react";
import { CompactPicker } from "react-color";

const ColorPicker = React.memo(({ handleColorChange }) => {
  return (
    <CompactPicker
      color={['#D9E3F0']}
      onChangeComplete={handleColorChange}
    />
  );
})
export default ColorPicker;
