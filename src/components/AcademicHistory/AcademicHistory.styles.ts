import { Card, styled, TableCell, Typography } from "@mui/material";

export const Wrapper = styled("div")(() => ({}));

export const Header = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: 16,
  whiteSpace: "pre-wrap",
}));

export const Footer = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "end",
  marginTop: 8,
}));

export const InfoCard = styled(Card)(() => ({
  marginBottom: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "fit-content",
}));

export const InfoCardRow = styled("div")(() => ({
  display: "flex",
  gap: 4,
}));

export const TableCellCentered = styled(TableCell)({
  textAlign: "center",
  "& svg": {
    marginLeft: 4,
  },
});
