import { localStorageKeys } from "@constants";
import { Typography, type ButtonProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { calculateTimeLeft } from "../calculateTimeLeft/calculateTimeLeft";
import { formatTime } from "../formatTime/formatTime";
import * as Styles from "./PomodoroTimer.styles";

interface IPomodoroTimer {
  time: number;
  isSelected: boolean;
  toastAlert: () => void;
}

export const PomodoroTimer = ({
  time,
  isSelected,
  toastAlert,
}: IPomodoroTimer) => {
  let interval: NodeJS.Timeout | undefined;

  const [startTime, setStartTime] = useLocalStorage<number | null>(
    localStorageKeys.pomodoroStartTime(time),
    null
  );
  const [isActive, setIsActive] = useLocalStorage(
    localStorageKeys.pomodoroIsActive(time),
    false
  );
  const [timeLeftStoraged, setTimeLeftStoraged] = useLocalStorage(
    localStorageKeys.pomodoroTimeLeft(time),
    time
  );
  const [timeLeft, setTimeLeft] = useState(
    isActive ? calculateTimeLeft(startTime, time) : timeLeftStoraged
  );

  useEffect(() => {
    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft(startTime, time);
      handleTimeLeft(newTimeLeft);

      if (newTimeLeft < 0) {
        const audio = new Audio("/static//pomodoro-alarm.mp3");
        audio.volume = 0.1;
        audio.play();
        toastAlert();
        handleResetTimer();
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

  if (!isSelected) return null;

  const defaultButtonProps: ButtonProps = {
    variant: "contained",
    size: "small",
    color: "secondary",
  };

  return (
    <Styles.Wrapper>
      <Typography variant="h1">{formatTime(timeLeft)}</Typography>
      <Styles.ButtonWrapper>
        <Styles.Button
          {...defaultButtonProps}
          onClick={handleStartTimer}
          disabled={isActive || timeLeft === 0}
        >
          {startTime ? "Retomar" : "Iniciar"}
        </Styles.Button>
        <Styles.Button
          {...defaultButtonProps}
          onClick={isActive ? handleStopTimer : handleResetTimer}
          disabled={!startTime}
        >
          {isActive ? "Pausar" : "Resetar"}
        </Styles.Button>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
};
