import { pathRoutes } from "@constants";
import { usersDatabase } from "@database";
import type { IUser } from "@interfaces";
import { firebaseApp } from "@services";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
  type Auth,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { redirect } from "react-router-dom";

interface IAuthContext {
  auth: Auth;
  isInitialized: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  isLoadingGoogleSignIn: boolean;
  isLoadingGitHubSignIn: boolean;
  user: IUser | null;
  updateUser: (user: Partial<IUser>) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  auth: {} as Auth,
  isInitialized: false,
  isAuthenticated: false,
  logout: async () => {},
  signInWithGoogle: async () => {},
  signInWithGitHub: async () => {},
  isLoadingGoogleSignIn: false,
  isLoadingGitHubSignIn: false,
  user: null,
  updateUser: async () => {},
});

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] = useState(false);
  const [isLoadingGitHubSignIn, setIsLoadingGitHubSignIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsAuthenticated(true);
          const dbUser = await usersDatabase.getUser(user.uid);

          if (dbUser) {
            setUser(dbUser);
          } else {
            const newUser: IUser = {
              id: user.uid,
              avatar: user.photoURL ?? "",
              email: user.email ?? "",
              name: user.displayName ?? "",
              generations: 0,
            };

            usersDatabase.createUser(newUser);
            setUser(newUser);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setIsInitialized(true);
      }),
    []
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoadingGoogleSignIn(true);
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      setIsLoadingGoogleSignIn(false);
      redirect(pathRoutes.home);
    } catch (err) {
      setIsLoadingGoogleSignIn(false);
      console.error(err);
    }
  }, []);

  const signInWithGitHub = useCallback(async () => {
    try {
      setIsLoadingGitHubSignIn(true);
      const provider = new GithubAuthProvider();

      await signInWithPopup(auth, provider);

      setIsLoadingGitHubSignIn(false);
      redirect(pathRoutes.home);
    } catch (err) {
      setIsLoadingGitHubSignIn(false);
      console.error(err);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const updateUser = useCallback(
    async (newUser: Partial<IUser>) => {
      if (auth.currentUser && user) {
        try {
          const updatedUser = {
            ...user,
            ...newUser,
          };

          setUser(updatedUser);

          const { name, avatar } = newUser;

          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatar,
          });

          await usersDatabase.updateUser(updatedUser);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated,
      isInitialized,
      logout,
      signInWithGoogle,
      signInWithGitHub,
      isLoadingGoogleSignIn,
      isLoadingGitHubSignIn,
      user,
      updateUser,
    }),
    [
      isAuthenticated,
      isInitialized,
      logout,
      signInWithGoogle,
      signInWithGitHub,
      isLoadingGoogleSignIn,
      isLoadingGitHubSignIn,
      user,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const auth = getAuth(firebaseApp);

export const useAuth = () => useContext(AuthContext);
