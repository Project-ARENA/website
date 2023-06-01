import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields(props) {
  const { label, onChange, initialValue} = props
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label={label}
          multiline
          maxRows={4}
          inputProps={{
            onChange: onChange,
          }}
          defaultValue={initialValue}
        />
      </div>
    </Box>
  );
}