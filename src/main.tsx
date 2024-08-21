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
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(
	document.getElementById("root") as ReactDOM.Container,
).render(
	<React.StrictMode>
		<SettingsProvider>
			<SettingsConsumer>
				{({ settings }) => (
					<ThemeProvider theme={createTheme({ mode: settings.theme })}>
						<CssBaseline />
						<Toaster position="top-center" />
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
