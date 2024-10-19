import { LoadingButton } from "@mui/lab";
import { Card, styled } from "@mui/material";

export const ModalCard = styled(Card)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  whiteSpace: "pre-wrap",
}));

export const ModalButton = styled(LoadingButton)(() => ({
  width: "fit-content",
  margin: "0 auto",
}));

export const ConfirmButton = styled(LoadingButton)(() => ({
  width: "fit-content",
  alignSelf: "flex-end",
}));
