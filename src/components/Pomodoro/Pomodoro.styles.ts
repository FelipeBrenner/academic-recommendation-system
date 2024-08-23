import { Card as MuiCard, styled } from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
	padding: "12px 24px 24px 24px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2),
	maxWidth: 300,
	margin: "auto",
}));
