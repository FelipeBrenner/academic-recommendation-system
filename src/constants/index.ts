export const pathRoutes = {
	home: "/",
	login: "/login",
	perfil: "/profile",
};

const systemName = "acad-rec-sys";

export const localStorageKeys = {
	email: `${systemName}-email`,
	settings: `${systemName}-settings`,
	pomodoroTimeLeft: (tab: number) => `${systemName}-pomodoro-time-left-${tab}`,
	pomodoroStartTime: (tab: number) =>
		`${systemName}-pomodoro-start-time-${tab}`,
	pomodoroIsActive: (tab: number) => `${systemName}-pomodoro-is-active-${tab}`,
	pomodoroTabSelected: `${systemName}-pomodoro-tab-selected`,
};

export const sidebarWidth = 240;
