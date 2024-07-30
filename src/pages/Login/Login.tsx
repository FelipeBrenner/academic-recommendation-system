import { Logo } from "@components";
import { pathRoutes } from "@constants";
import { useAuth } from "@contexts";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import * as Styles from "./Login.styles";

export const Login = () => {
	const {
		isAuthenticated,
		signInWithGoogle,
		signInWithGitHub,
		isLoadingGoogleSignIn,
		isLoadingGitHubSignIn,
	} = useAuth();

	if (isAuthenticated) {
		return <Navigate to={pathRoutes.home} />;
	}

	return (
		<Styles.LoginContainer>
			<Styles.LoginCard elevation={16}>
				<Logo />
				<Typography variant="h4">
					Sistema de Recomendação de Plano de Estudos Acadêmico
				</Typography>
				<Typography variant="body2" color="textSecondary">
					Entre com o método de login de sua preferência
				</Typography>
				<Styles.ButtonsContainer>
					<Styles.GoogleButton
						fullWidth
						onClick={signInWithGoogle}
						size="large"
						variant="contained"
						loading={isLoadingGoogleSignIn}
					>
						{!isLoadingGoogleSignIn && (
							<Styles.PlatformIcon alt="Google" src="src/assets/google.svg" />
						)}
					</Styles.GoogleButton>
					<Styles.GitHubButton
						fullWidth
						onClick={signInWithGitHub}
						size="large"
						variant="contained"
						loading={isLoadingGitHubSignIn}
					>
						{!isLoadingGitHubSignIn && (
							<Styles.PlatformIcon alt="GitHub" src="src/assets/github.svg" />
						)}
					</Styles.GitHubButton>
				</Styles.ButtonsContainer>
			</Styles.LoginCard>
		</Styles.LoginContainer>
	);
};
