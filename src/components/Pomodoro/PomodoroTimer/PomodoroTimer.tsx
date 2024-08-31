import { localStorageKeys } from "@constants";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { calculateTimeLeft } from "../calculateTimeLeft/calculateTimeLeft";
import * as Styles from "./PomodoroTimer.styles";

interface IPomodoroTimer {
	time: number;
}

export const PomodoroTimer = ({ time }: IPomodoroTimer) => {
	let interval: NodeJS.Timeout | undefined;

	const [startTime, setStartTime] = useLocalStorage<number | null>(
		localStorageKeys.pomodoroStartTime(time),
		null,
	);
	const [isActive, setIsActive] = useLocalStorage(
		localStorageKeys.pomodoroIsActive(time),
		false,
	);
	const [timeLeftStoraged, setTimeLeftStoraged] = useLocalStorage(
		localStorageKeys.pomodoroTimeLeft(time),
		time,
	);
	const [timeLeft, setTimeLeft] = useState(
		isActive ? calculateTimeLeft(startTime, time) : timeLeftStoraged,
	);

	useEffect(() => {
		const updateTimer = () => {
			const newTimeLeft = calculateTimeLeft(startTime, time);
			handleTimeLeft(newTimeLeft);

			if (newTimeLeft <= 0) {
				setIsActive(false);
				clearInterval(interval);
			}
		};

		if (isActive) {
			updateTimer();
			interval = setInterval(updateTimer, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, startTime]);

	const handleTimeLeft = (timeLeft: number) => {
		setTimeLeft(timeLeft);
		setTimeLeftStoraged(timeLeft);
	};

	const handleStartTimer = () => {
		setIsActive(true);

		const currentTime = Math.floor(Date.now() / 1000);

		if (startTime && timeLeft > 0) {
			setStartTime(startTime + (currentTime - startTime) - (time - timeLeft));
			return;
		}

		setStartTime(currentTime);
	};

	const handleStopTimer = () => {
		setIsActive(false);
	};

	const handleResetTimer = () => {
		setIsActive(false);
		handleTimeLeft(time);
		setStartTime(null);
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	return (
		<Styles.Wrapper>
			<Typography variant="h1">{formatTime(timeLeft)}</Typography>
			<Styles.ButtonWrapper>
				<Styles.Button
					variant="contained"
					size="small"
					color="secondary"
					onClick={handleStartTimer}
					disabled={isActive || timeLeft === 0}
				>
					{startTime ? "Retomar" : "Iniciar"}
				</Styles.Button>
				<Styles.Button
					variant="contained"
					size="small"
					color="secondary"
					onClick={isActive ? handleStopTimer : handleResetTimer}
					disabled={!startTime}
				>
					{isActive ? "Pausar" : "Resetar"}
				</Styles.Button>
			</Styles.ButtonWrapper>
		</Styles.Wrapper>
	);
};
