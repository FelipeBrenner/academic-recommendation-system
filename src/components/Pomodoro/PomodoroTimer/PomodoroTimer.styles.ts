import { Button as MuiButton, styled } from "@mui/material";

export const Wrapper = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2),
	width: "100%",
	padding: "16px 24px 24px 24px",
}));

export const ButtonWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(1),
	width: "100%",
}));

export const Button = styled(MuiButton)(() => ({
	width: "100%",
}));
