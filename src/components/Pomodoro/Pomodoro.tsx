import { localStorageKeys } from "@constants";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import * as Styles from "./Pomodoro.styles";

const TIME = 60 * 25;

const calculateTimeLeft = (startTime: number | null) => {
	if (!startTime) return TIME;

	const now = Math.floor(Date.now() / 1000);
	const elapsedTime = now - startTime;
	const newTimeLeft = TIME - elapsedTime;
	if (newTimeLeft <= 0) {
		return 0;
	}

	return newTimeLeft;
};

export const Pomodoro = () => {
	const [startTime, setStartTime] = useLocalStorage<number | null>(
		localStorageKeys.pomodoroStartTime,
		null,
	);
	const [isActive, setIsActive] = useLocalStorage(
		localStorageKeys.pomodoroIsActive,
		false,
	);
	const [timeLeftStoraged, setTimeLeftStoraged] = useLocalStorage(
		localStorageKeys.pomodoroTimeLeft,
		TIME,
	);
	const [timeLeft, setTimeLeft] = useState(
		isActive ? calculateTimeLeft(startTime) : timeLeftStoraged,
	);

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;

		const updateTimer = () => {
			const newTimeLeft = calculateTimeLeft(startTime);
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

		if (startTime) {
			setStartTime(startTime + (currentTime - startTime) - (TIME - timeLeft));
			return;
		}

		setStartTime(currentTime);
	};

	const handleStopTimer = () => {
		setIsActive(false);
	};

	const handleResetTimer = () => {
		setIsActive(false);
		handleTimeLeft(TIME);
		setStartTime(null);
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	return (
		<Styles.Card>
			<Typography variant="h1">{formatTime(timeLeft)}</Typography>
			<Styles.ButtonWrapper>
				<Styles.Button
					variant="contained"
					size="small"
					color="secondary"
					onClick={handleStartTimer}
					disabled={isActive}
				>
					Iniciar
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
		</Styles.Card>
	);
};
