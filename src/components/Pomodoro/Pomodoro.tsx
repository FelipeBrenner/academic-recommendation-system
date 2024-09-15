import { InformationCard } from "@components";
import { localStorageKeys } from "@constants";
import type { IRecommendation } from "@interfaces";
import { Tab, Tabs } from "@mui/material";
import type { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";
import * as Styles from "./Pomodoro.styles";
import { PomodoroTimer } from "./PomodoroTimer/PomodoroTimer";

const tabs = [
	{
		label: "Foco",
		time: 60 * 25,
		toastAlert: () => {
			toast("Tempo de foco acabou, vá dar uma pausa!", {
				autoClose: false,
				icon: () => "👏",
			});
		},
	},
	{
		label: "Pausa curta",
		time: 60 * 5,
		toastAlert: () => {
			toast("Tempo de pausa curta acabou, bom foco!", {
				autoClose: false,
				icon: () => "🚀",
			});
		},
	},
	{
		label: "Pausa longa",
		time: 60 * 15,
		toastAlert: () => {
			toast("Tempo de pausa longa acabou, bom foco!", {
				autoClose: false,
				icon: () => "🚀",
			});
		},
	},
];

interface IPomodoro {
	recommendation?: IRecommendation;
}

export const Pomodoro = ({ recommendation }: IPomodoro) => {
	const [tabSelected, setTabSelected] = useLocalStorage<number | null>(
		localStorageKeys.pomodoroTabSelected,
		0,
	);

	const handleChange = (_: SyntheticEvent, value: number) => {
		setTabSelected(value);
	};

	return (
		<Styles.Card>
			{recommendation && (
				<Styles.InfoTooltip
					title={<InformationCard information={recommendation} />}
				>
					<Styles.InfoIcon />
				</Styles.InfoTooltip>
			)}
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
			{tabs.map((tab, index) => (
				<PomodoroTimer
					key={tab.label}
					time={tab.time}
					isSelected={tabSelected === index}
					toastAlert={tab.toastAlert}
				/>
			))}
		</Styles.Card>
	);
};
