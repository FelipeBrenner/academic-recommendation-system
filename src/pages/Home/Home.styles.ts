import { Grid, TextField, Typography, styled } from "@mui/material";

export const GridContainer = styled(Grid)(({ theme }) => ({
	marginTop: 0,
	width: "100%",
	marginLeft: 0,
}));

export const GridItem = styled(Grid)(({ theme }) => ({
	width: "100%",
	padding: theme.spacing(3),
}));

export const Title = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(3),
}));

export const Input = styled(TextField)(({ theme }) => ({
	marginTop: theme.spacing(3),
	display: "block",
	width: "100%",
	"&>div": {
		width: "100%",
	},
}));

export const Text = styled(Typography)(({ theme }) => ({
	marginTop: theme.spacing(3),
}));
