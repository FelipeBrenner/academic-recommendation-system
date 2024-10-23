import {
  Avatar as MuiAvatar,
  Box as MuiBox,
  Card as MuiCard,
  TextField,
  styled,
  FormControlLabel,
} from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const AvatarContainer = styled(MuiBox)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  marginBottom: theme.spacing(3),
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  height: theme.spacing(8),
  width: theme.spacing(8),
  marginRight: theme.spacing(2),
  fontSize: theme.typography.h5.fontSize,
}));

export const InputEmail = styled(TextField)(() => ({
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "dashed",
  },
}));

export const ButtonContainer = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "end",
  marginTop: theme.spacing(3),
}));

export const CheckboxControl = styled(FormControlLabel)(() => ({
  marginTop: -9,
}));

export const TooltipCard = styled(MuiCard)(({ theme }) => ({
  padding: "4px 8px",
  borderRadius: 12,
  backgroundColor: theme.palette.neutral?.[800],
}));
