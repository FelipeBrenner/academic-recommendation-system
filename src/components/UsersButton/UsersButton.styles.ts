import { IconButton as MuiIconButton, styled } from "@mui/material";

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
	marginLeft: theme.spacing(1),
}));
