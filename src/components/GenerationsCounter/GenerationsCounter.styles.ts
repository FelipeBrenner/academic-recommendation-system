import { styled, Card as MuiCard } from "@mui/material";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginRight: 8,
  "& > div": {
    backgroundColor: "#ffff !important",
  },
}));

export const Card = styled(MuiCard)(({ theme }) => ({
  padding: "4px 8px",
  borderRadius: 12,
  backgroundColor: theme.palette.neutral?.[800],
}));
