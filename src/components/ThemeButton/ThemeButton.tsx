import { useSettings } from "@contexts";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

export const ThemeButton = () => {
	const { settings, setSettings } = useSettings();

	const handleChange = () => {
		setSettings((settings) => ({
			...settings,
			theme: settings.theme === "dark" ? "light" : "dark",
		}));
	};

	return (
		<IconButton onClick={handleChange}>
			{settings.theme === "dark" ? (
				<DarkModeIcon fontSize="small" />
			) : (
				<LightModeIcon fontSize="small" />
			)}
		</IconButton>
	);
};
