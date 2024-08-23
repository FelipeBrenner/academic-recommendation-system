import { localStorageKeys } from "@constants";
import { Tab, Tabs } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useLocalStorage } from "usehooks-ts";
import * as Styles from "./Pomodoro.styles";
import { PomodoroTimer } from "./PomodoroTimer/PomodoroTimer";

const tabs = [
	{
		label: "Foco",
		time: 60 * 25,
	},
	{
		label: "Pausa curta",
		time: 60 * 5,
	},
	{
		label: "Pausa longa",
		time: 60 * 15,
	},
];

export const Pomodoro = () => {
	const [tabSelected, setTabSelected] = useLocalStorage<number | null>(
		localStorageKeys.pomodoroTabSelected,
		0,
	);

	const handleChange = (_: SyntheticEvent, value: number) => {
		setTabSelected(value);
	};

	return (
		<Styles.Card>
			<Tabs
				value={tabSelected}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="secondary"
			>
				{tabs.map((tab) => (
					<Tab key={tab.label} label={tab.label} />
				))}
			</Tabs>
			{tabs.map((tab, index) =>
				index === tabSelected ? (
					<PomodoroTimer key={tab.label} time={tab.time} />
				) : null,
			)}
		</Styles.Card>
	);
};
