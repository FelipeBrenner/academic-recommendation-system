import { AuthProvider } from "@contexts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { routers } from "@routers";
import { createTheme } from "@themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(
	document.getElementById("root") as ReactDOM.Container,
).render(
	<React.StrictMode>
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<AuthProvider>
				<RouterProvider router={routers} />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
