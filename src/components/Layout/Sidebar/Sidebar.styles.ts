import { Box, styled } from "@mui/material";
import { Logo as LogoComponent } from "../../Logo/Logo";

export const Logo = styled(LogoComponent)(({ theme }) => ({
	height: theme.spacing(6),
	width: theme.spacing(6),
}));

export const LogoBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	paddingTop: theme.spacing(3),
}));
