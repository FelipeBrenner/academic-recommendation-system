import { styled, TableCell, Typography } from "@mui/material";

export const Wrapper = styled("div")(() => ({
  width: "calc(100% - 32px)",
}));

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

export const TableCellCentered = styled(TableCell)({
  textAlign: "center",
  "& svg": {
    marginLeft: 4,
  },
});
