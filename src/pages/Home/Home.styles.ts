import { TextField, Typography, styled } from "@mui/material";

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
