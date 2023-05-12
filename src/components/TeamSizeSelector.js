import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


function TeamSizeSelector() {
  const [minSize, setMinSize] = useState(1);
  const [maxSize, setMaxSize] = useState(10);

  function handleMinSizeChange(event) {
    const newMinSize = parseInt(event.target.value);
    setMinSize(newMinSize);
    console.log(`Minimum team size set to ${newMinSize}`);
  }

  function handleMaxSizeChange(event) {
    const newMaxSize = parseInt(event.target.value);
    setMaxSize(newMaxSize);
    console.log(`Maximum team size set to ${newMaxSize}`);
  }

  return (
    <Box>
  <TextField
    label="Minimum team size"
    type="number"
    value={minSize}
    onChange={(e) => {
      setMinSize(e.target.value);
      console.log("Minimum team size:", e.target.value);
    }}
  />
  {'  '}
  <TextField
    label="Maximum team size"
    type="number"
    value={maxSize}
    onChange={(e) => {
      setMaxSize(e.target.value);
      console.log("Maximum team size:", e.target.value);
    }}
  />
</Box>

  );
}

export default TeamSizeSelector;
