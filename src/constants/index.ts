export const pathRoutes = {
  home: "/",
  login: "/login",
  calendar: "/calendar",
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
  gptResponse: `${systemName}-gpt-response`,
};

export const sidebarWidth = 240;

export const COLORS = [
  "#E53935",
  "#8E24AA",
  "#3949AB",
  "#039BE5",
  "#00897B",
  "#7CB342",
  "#FDD835",
  "#FB8C00",
  "#6D4C41",
  "#546E7A",
  "#F06292",
  "#9575CD",
  "#64B5F6",
  "#4DD0E1",
  "#81C784",
  "#DCE775",
  "#FFD54F",
  "#FF8A65",
  "#E0E0E0",
  "#D81B60",
  "#5E35B1",
  "#1E88E5",
  "#00ACC1",
  "#43A047",
  "#C0CA33",
  "#FFB300",
  "#F4511E",
  "#757575",
  "#E57373",
  "#BA68C8",
  "#7986CB",
  "#4FC3F7",
  "#4DB6AC",
  "#AED581",
  "#FFF176",
  "#FFB74D",
  "#A1887F",
  "#90A4AE",
];

export const MAX_GENERATIONS = 6;
