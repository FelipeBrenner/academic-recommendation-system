import { Button as MuiButton, Card as MuiCard, styled } from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
	padding: theme.spacing(3),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2),
}));

export const ButtonWrapper = styled("div")(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(1),
	width: "100%",
}));

export const Button = styled(MuiButton)(() => ({
	width: "100%",
}));
