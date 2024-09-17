import { Card as MuiCard, Tabs as MuiTabs, styled } from "@mui/material";

export const Card = styled(MuiCard)(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	maxWidth: 300,
	margin: "auto",
}));

export const Tabs = styled(MuiTabs)(() => ({
	padding: "12px 24px 0 24px",
}));
