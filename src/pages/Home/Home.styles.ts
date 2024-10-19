import { Container as MuiContainer, styled } from "@mui/material";

export const Container = styled(MuiContainer)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));
