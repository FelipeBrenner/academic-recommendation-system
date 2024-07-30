import { SplashScreen } from "@components";
import { pathRoutes } from "@constants";
import { useAuth } from "@contexts";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IAuthGuardProps {
	isLogin?: boolean;
	children: ReactNode;
}

export const AuthGuard = ({ isLogin = false, children }: IAuthGuardProps) => {
	const { isInitialized, isAuthenticated } = useAuth();

	if (!isInitialized) {
		return <SplashScreen />;
	}

	if (isAuthenticated) {
		return isLogin ? <Navigate to={pathRoutes.home} /> : children;
	}

	return isLogin ? children : <Navigate to={pathRoutes.login} />;
};
