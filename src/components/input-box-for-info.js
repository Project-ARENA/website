import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Tooltip from "@mui/material/Tooltip";

export default function BasicTextFields(props) {
  const { buttonText, onChange, isPassword, initialValue, id, tooltipText } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title={tooltipText}>
        <TextField
          id="outlined-basic"
          label={buttonText}
          variant="outlined"
          data-testid={id}
          inputProps={{
            onChange: onChange,
          }}
          type={showPassword ? "text" : (isPassword ? "password" : "text")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </Box>
  );
}
