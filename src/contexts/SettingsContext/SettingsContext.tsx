import { localStorageKeys } from "@constants";
import type { ThemeType } from "@themes";
import {
	createContext,
	useContext,
	useMemo,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";
import { useLocalStorage } from "usehooks-ts";

export interface Settings {
	theme: ThemeType;
}

export interface SettingsContextValue {
	settings: Settings;
	setSettings: Dispatch<SetStateAction<Settings>>;
}

interface SettingsProviderProps {
	children?: ReactNode;
}

const initialSettings: Settings = {
	theme: "dark",
};

export const SettingsContext = createContext<SettingsContextValue>({
	settings: initialSettings,
	setSettings: () => {},
});

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const [settings, setSettings] = useLocalStorage<Settings>(
		localStorageKeys.settings,
		initialSettings,
	);

	const value = useMemo(
		() => ({
			settings,
			setSettings,
		}),
		[settings, setSettings],
	);

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = (): SettingsContextValue =>
	useContext(SettingsContext);
