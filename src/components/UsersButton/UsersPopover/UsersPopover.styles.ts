import {
  Button,
  Card,
  Avatar as MuiAvatar,
  List as MuiList,
  ListItem as MuiListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const List = styled(MuiList)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ListItem = styled(MuiListItem)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.5),
  padding: 0,
}));

export const UserButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  justifyContent: "flex-start",
  paddingRight: theme.spacing(2),
  textAlign: "left",
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  flexWrap: "nowrap",
  variants: {
    allowShareData: {
      false: {
        cursor: "auto",
      },
    },
  },
}));

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  fontSize: `${theme.typography.body2.fontSize} !important`,
  cursor: "pointer",
}));

export const UserInfo = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const ModalCard = styled(Card)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  whiteSpace: "pre-wrap",
  background: theme.palette.background.default,
  width: "calc(100% - 48px)",
  maxWidth: 1200,
  maxHeight: "calc(100% - 48px)",
  // height: "auto",
  // maxHeight: 923.88,
}));

export const Loading = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "200px 0",
}));
