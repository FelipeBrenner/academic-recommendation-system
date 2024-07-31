import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, styled } from "@mui/material";

export const LoginContainer = styled(Container)(({ theme }) => ({
	padding: theme.spacing(8),
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export const LoginCard = styled(Card)(({ theme }) => ({
	padding: theme.spacing(4),
	width: "100%",
	maxWidth: "560px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
	gap: theme.spacing(2),
}));

const PlatformButton = styled(LoadingButton)(() => ({
	height: "48px",
	"&:hover": {
		opacity: 0.7,
		transition: "opacity 0.2s",
	},
}));

export const GoogleButton = styled(PlatformButton)(({ theme }) => ({
	backgroundColor: theme.palette.neutral?.[100],
	"&:hover, &:disabled": {
		backgroundColor: theme.palette.neutral?.[100],
		"& > span": {
			color: theme.palette.neutral?.[900],
		},
	},
}));

export const GitHubButton = styled(PlatformButton)(({ theme }) => ({
	backgroundColor: theme.palette.neutral?.[700],
	color: theme.palette.common.white,
	"&:hover, &:disabled": {
		backgroundColor: theme.palette.neutral?.[700],
		"& > span": {
			color: theme.palette.neutral?.[100],
		},
	},
}));

export const PlatformIcon = styled("img")(({ theme }) => ({
	width: theme.spacing(3),
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100%",
	gap: theme.spacing(2),
	marginTop: theme.spacing(1),
}));
