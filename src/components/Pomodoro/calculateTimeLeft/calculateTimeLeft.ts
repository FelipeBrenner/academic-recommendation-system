export const calculateTimeLeft = (startTime: number | null, time: number) => {
	if (!startTime) return time;

	const now = Math.floor(Date.now() / 1000);
	const elapsedTime = now - startTime;
	const newTimeLeft = time - elapsedTime;
	if (newTimeLeft <= 0) {
		return 0;
	}

	return newTimeLeft;
};
