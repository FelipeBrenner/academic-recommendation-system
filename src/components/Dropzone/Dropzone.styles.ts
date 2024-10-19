import { styled } from "@mui/material";

export const Dropzone = styled("div")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 32,
  borderWidth: 2,
  borderRadius: 20,
  borderStyle: "dashed",
  outline: "none",
  transition: "opacity .1s ease-in-out, border .1s ease-in-out",
  opacity: 0.4,
  ":hover": {
    opacity: 1,
    cursor: "pointer",
  },
}));
