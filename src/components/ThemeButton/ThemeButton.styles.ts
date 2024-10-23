import {
  IconButton as MuiIconButton,
  styled,
  Card as MuiCard,
} from "@mui/material";

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const Card = styled(MuiCard)(({ theme }) => ({
  padding: "4px 8px",
  borderRadius: 12,
  backgroundColor: theme.palette.neutral?.[800],
}));
