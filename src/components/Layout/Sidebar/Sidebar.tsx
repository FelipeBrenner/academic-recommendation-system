import { pathRoutes, sidebarWidth } from "@constants";
import { AccountCircle, CalendarMonth, Home } from "@mui/icons-material";
import type { DrawerProps, Theme } from "@mui/material";
import { Drawer, useMediaQuery } from "@mui/material";
import { SidebarSection } from "../SidebarSection";
import * as Styles from "./Sidebar.styles";

interface SidebarProps {
	onClose?: () => void;
	open?: boolean;
}

const sections = [
	{
		title: "Geral",
		items: [
			{
				title: "Home",
				path: pathRoutes.home,
				icon: <Home fontSize="small" />,
			},
			{
				title: "Calendário",
				path: pathRoutes.calendar,
				icon: <CalendarMonth fontSize="small" />,
			},
		],
	},
	{
		title: "Pessoal",
		items: [
			{
				title: "Perfil",
				path: pathRoutes.perfil,
				icon: <AccountCircle fontSize="small" />,
			},
		],
	},
];

export const Sidebar = ({ onClose, open }: SidebarProps) => {
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
		noSsr: true,
	});

	const content = (
		<>
			<Styles.LogoBox>
				<Styles.Logo />
			</Styles.LogoBox>
			{sections.map((section) => (
				<SidebarSection key={section.title} {...section} />
			))}
		</>
	);

	const defaultDrawerProps: DrawerProps = {
		anchor: "left",
		PaperProps: {
			sx: {
				width: sidebarWidth,
				boxShadow: 3,
				borderBottomWidth: 1,
				borderBottomStyle: "solid",
			},
		},
	};

	if (lgUp) {
		return (
			<Drawer variant="permanent" open {...defaultDrawerProps}>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			variant="temporary"
			open={open}
			onClose={onClose}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			{...defaultDrawerProps}
		>
			{content}
		</Drawer>
	);
};
