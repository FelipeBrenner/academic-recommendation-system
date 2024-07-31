import { ThemeButton } from "@components";
import { sidebarWidth } from "@constants";
import { useAuth } from "@contexts";
import MenuIcon from "@mui/icons-material/Menu";
import { ButtonBase, IconButton, type AppBarProps } from "@mui/material";
import { getUserAcronym } from "@utils";
import { useRef, useState } from "react";
import { AccountPopover } from "../AccountPopover";
import * as Styles from "./NavBar.styles";

interface NavbarProps extends AppBarProps {
	onOpenSidebar?: () => void;
}

const AccountButton = () => {
	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [openPopover, setOpenPopover] = useState<boolean>(false);
	const { user } = useAuth();

	const handleOpenPopover = (): void => {
		setOpenPopover(true);
	};

	const handleClosePopover = (): void => {
		setOpenPopover(false);
	};

	return (
		<>
			<Styles.AvatarBox
				component={ButtonBase}
				onClick={handleOpenPopover}
				ref={anchorRef}
			>
				<Styles.Avatar src={user?.avatar}>
					{getUserAcronym(user?.name, user?.email)}
				</Styles.Avatar>
			</Styles.AvatarBox>
			<AccountPopover
				anchorEl={anchorRef.current}
				onClose={handleClosePopover}
				open={openPopover}
			/>
		</>
	);
};

export const Navbar = ({ onOpenSidebar, ...other }: NavbarProps) => (
	<Styles.AppBar
		sx={{
			left: {
				lg: sidebarWidth,
			},
			width: {
				lg: `calc(100% - ${sidebarWidth}px)`,
			},
		}}
		{...other}
	>
		<Styles.Toolbar disableGutters>
			<IconButton
				onClick={onOpenSidebar}
				sx={{
					display: {
						xs: "inline-flex",
						lg: "none",
					},
				}}
			>
				<MenuIcon fontSize="small" />
			</IconButton>
			<Styles.FlexGrowBox />
			<ThemeButton />
			<AccountButton />
		</Styles.Toolbar>
	</Styles.AppBar>
);
