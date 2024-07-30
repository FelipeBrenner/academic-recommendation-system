import { pathRoutes } from "@constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import type { Theme } from "@mui/material";
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
				icon: <HomeIcon fontSize="small" />,
			},
		],
	},
	{
		title: "Pessoal",
		items: [
			{
				title: "Perfil",
				path: pathRoutes.perfil,
				icon: <AccountCircleIcon fontSize="small" />,
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

	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: "neutral.900",
						borderRightColor: "divider",
						borderRightStyle: "solid",
						borderRightWidth: (theme) =>
							theme.palette.mode === "dark" ? 1 : 0,
						color: "#FFFFFF",
						width: 280,
					},
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor="left"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: "neutral.900",
					color: "#FFFFFF",
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};
