import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

let min = 1;
let max = 10;

function TeamSizeSelector() {
  const [minSize, setMinSize] = useState(1);
  const [maxSize, setMaxSize] = useState(10);

  function handleMinSizeChange(event) {
    min = parseInt(event.target.value);
    setMinSize(min);
  }

  function handleMaxSizeChange(event) {
    max = parseInt(event.target.value)
    setMaxSize(max);
  }

  return (
    <Box>
  <TextField
    label="Minimum team size"
    type="number"
    value={minSize}
    onChange={handleMinSizeChange}
  />
  {'  '}
  <TextField
    label="Maximum team size"
    type="number"
    value={maxSize}
    onChange={handleMaxSizeChange}
  />
</Box>

  );
}

export { TeamSizeSelector, min, max };
