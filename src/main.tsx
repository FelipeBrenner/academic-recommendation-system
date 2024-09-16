import "@fullcalendar/react/dist/vdom";

import "styles/common.css";
import "styles/daygrid.css";

import { Toast } from "@components";
import {
	AuthProvider,
	QueryClientProvider,
	SettingsConsumer,
	SettingsProvider,
} from "@contexts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { routers } from "@routers";
import { createTheme } from "@themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
	document.getElementById("root") as ReactDOM.Container,
).render(
	<React.StrictMode>
		<SettingsProvider>
			<SettingsConsumer>
				{({ settings }) => (
					<ThemeProvider theme={createTheme({ mode: settings.theme })}>
						<CssBaseline />
						<Toast theme={settings.theme} />
						<QueryClientProvider>
							<AuthProvider>
								<RouterProvider router={routers} />
							</AuthProvider>
						</QueryClientProvider>
					</ThemeProvider>
				)}
			</SettingsConsumer>
		</SettingsProvider>
	</React.StrictMode>,
);
