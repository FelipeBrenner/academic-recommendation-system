import type { Theme } from "@mui/material";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";
import { lightThemeOptions } from "./light-theme-options";

interface Neutral {
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
}

declare module "@mui/material/styles" {
	interface Palette {
		neutral?: Neutral;
	}

	interface PaletteOptions {
		neutral?: Neutral;
	}
}

export type ThemeType = "light" | "dark";

interface ThemeConfig {
	mode: ThemeType;
}

export const createTheme = (config: ThemeConfig): Theme => {
	const theme = createMuiTheme(
		baseThemeOptions,
		config.mode === "dark" ? darkThemeOptions : lightThemeOptions,
	);

	return theme;
};
