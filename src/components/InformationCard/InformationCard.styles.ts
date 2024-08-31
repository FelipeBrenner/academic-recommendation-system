import { Card as MuiCard, styled } from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
	padding: theme.spacing(3),
	display: "flex",
}));
