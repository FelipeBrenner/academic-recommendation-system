import { Info } from "@mui/icons-material";
import { Card as MuiCard, Tooltip, styled } from "@mui/material";

export const Card = styled(MuiCard)(({ theme }) => ({
	padding: "12px 24px 24px 24px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.spacing(2),
	maxWidth: 300,
	margin: "auto",
}));

export const InfoIcon = styled(Info)(() => ({
	position: "absolute",
	alignSelf: "flex-end",
	marginTop: "-14px",
	marginRight: "-26px",
	fontSize: "1rem",
}));

export const InfoTooltip = styled(Tooltip)(() => ({
	".MuiTooltip-tooltip": {
		backgroundColor: "transparent !important",
	},
}));
