import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, type ListItemProps } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Styles from "./SidebarItem.styles";

interface SidebarItemProps extends ListItemProps {
	active?: boolean;
	children?: ReactNode;
	chip?: ReactNode;
	depth: number;
	icon?: ReactNode;
	info?: ReactNode;
	open?: boolean;
	path?: string;
	title: string;
}

export const SidebarItem = ({
	active,
	children,
	chip,
	depth,
	icon,
	info,
	open: openProp,
	path,
	title,
	...other
}: SidebarItemProps) => {
	const [open, setOpen] = useState<boolean>(!!openProp);

	const handleToggle = (): void => {
		setOpen((prevOpen) => !prevOpen);
	};

	let paddingLeft = 24;

	if (depth > 0) {
		paddingLeft = 32 + 8 * depth;
	}

	const isActive = active ? "true" : "false";

	if (children) {
		return (
			<Styles.ChildrenListItem disableGutters {...other}>
				<Styles.ChildrenButton
					endIcon={
						!open ? (
							<ChevronRightIcon fontSize="small" />
						) : (
							<ExpandMoreIcon fontSize="small" />
						)
					}
					disableRipple
					onClick={handleToggle}
					startIcon={icon}
					pl={paddingLeft}
					active={isActive}
				>
					{title}
					{info}
				</Styles.ChildrenButton>
				<Collapse in={open} sx={{ mt: 0.5 }}>
					{children}
				</Collapse>
			</Styles.ChildrenListItem>
		);
	}

	return (
		<Styles.ParentListItem disableGutters>
			<Styles.ParentButton
				LinkComponent={Link}
				to={path ?? ""}
				startIcon={icon}
				endIcon={chip}
				disableRipple
				pl={paddingLeft}
				active={isActive}
			>
				{title}
				{info}
			</Styles.ParentButton>
		</Styles.ParentListItem>
	);
};
