import * as React from "react";
import Button from "@mui/joy/Button";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function ButtonIcons({ name, onClick,disabled,style, id, color }) {
  return (
    <Button
      variant="soft"
      endDecorator={<KeyboardArrowRight />}
      color={color}
      disabled = {disabled}
      onClick={onClick}
      name={name}
      style={style}
      data-testid={id}
    >
      {name}
    </Button>
  );
}
