import { useSettings } from "@contexts";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Tooltip } from "@mui/material";
import * as Styles from "./ThemeButton.styles";

export const ThemeButton = () => {
  const { settings, setSettings } = useSettings();

  const handleChange = () => {
    setSettings((settings) => ({
      ...settings,
      theme: settings.theme === "dark" ? "light" : "dark",
    }));
  };

  return (
    <Tooltip title="Tema">
      <Styles.IconButton onClick={handleChange}>
        {settings.theme === "dark" ? (
          <DarkModeIcon fontSize="small" />
        ) : (
          <LightModeIcon fontSize="small" />
        )}
      </Styles.IconButton>
    </Tooltip>
  );
};
