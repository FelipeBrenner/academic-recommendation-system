import { Info } from "@mui/icons-material";
import { Tooltip, styled } from "@mui/material";

export const InfoIcon = styled(Info)(() => ({
  position: "absolute",
  alignSelf: "flex-end",
  marginTop: "-2px",
  marginRight: "-2px",
  fontSize: "1rem",
}));

export const InfoTooltip = styled(Tooltip)(() => ({}));

export const InfoTitle = styled("div")(({ theme }) => ({
  ".MuiCard-root": {
    backgroundColor: theme.palette.neutral?.[800],
  },
}));
