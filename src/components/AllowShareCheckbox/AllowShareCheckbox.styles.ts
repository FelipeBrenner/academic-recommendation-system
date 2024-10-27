import { styled, Card as MuiCard, FormControlLabel } from "@mui/material";

export const TooltipCard = styled(MuiCard)(({ theme }) => ({
  padding: "4px 8px",
  borderRadius: 12,
  backgroundColor: theme.palette.neutral?.[800],
}));

export const CheckboxControl = styled(FormControlLabel)(() => ({
  marginTop: -9,
}));
