import type { StyledComponent } from "@emotion/styled";
import { Button, ListItem, styled, type ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router-dom";

interface CustomizedButtonProps
	extends ButtonProps,
		Partial<Pick<LinkProps, "to">> {
	pl: number;
	active?: string;
}

export const ParentButton: StyledComponent<CustomizedButtonProps> = styled(
	Button,
)<CustomizedButtonProps>(({ pl, active, theme }) => ({
	justifyContent: "flex-start",
	paddingLeft: pl,
	paddingRight: theme.spacing(3),
	textAlign: "left",
	textTransform: "none",
	width: "100%",
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.text.secondary,
	...(active === "true" && {
		backgroundColor: theme.palette.action.selected,
		fontWeight: "bold",
	}),
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
}));

export const ChildrenButton = styled(ParentButton)<CustomizedButtonProps>(
	({ theme }) => ({
		"& .MuiButton-endIcon": {
			color: theme.palette.neutral?.[400],
		},
	}),
);

const DefaultListItem = styled(ListItem)(({ theme }) => ({
	marginBottom: theme.spacing(0.5),
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: theme.spacing(2),
	paddingRight: theme.spacing(2),
}));

export const ParentListItem = styled(DefaultListItem)(() => ({
	display: "flex",
}));

export const ChildrenListItem = styled(DefaultListItem)(() => ({
	display: "block",
}));
