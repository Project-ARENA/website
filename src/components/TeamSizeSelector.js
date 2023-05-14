import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

let min = 1;
let max = 10;
let maxTeams = 50;
function TeamSizeSelector() {
  const [minSize, setMinSize] = useState(1);
  const [maxSize, setMaxSize] = useState(10);
  const [numTeams, setNumTeams] = useState(50);

  function handleMinSizeChange(event) {
    min = parseInt(event.target.value);
    setMinSize(min);
    console.log(`Minimum team size changed to ${min}`);
  }

  function handleMaxSizeChange(event) {
    max = parseInt(event.target.value)
    setMaxSize(max);
    console.log(`Maximum team size changed to ${max}`);
  }

  function handleNumTeamsChange(event) {
    maxTeams = parseInt(event.target.value);
    setNumTeams(maxTeams);
    console.log(`Number of teams changed to ${event.target.value}`);
  }

  return (
    <Box>
      <TextField
        label="Max number of teams"
        type="number"
        value={numTeams}
        onChange={handleNumTeamsChange}
      />
      {'  '}
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

export { TeamSizeSelector, min, max, maxTeams };
