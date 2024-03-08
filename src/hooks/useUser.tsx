import * as jose from "jose";
import Cookies from "js-cookie";
import { create } from "zustand";
import { router } from "~/main";

export default function useUser() {
  const { user, signOut } = useUserStore();

  return {
    user,
    isSignedIn: user !== null,
    signOut: () => {
      signOut();
      router.navigate({ to: "/" });
    },
  };
}

const useUserStore = create<UserState>((set) => ({
  user: getInitialState(),
  signOut: () =>
    set(() => {
      Cookies.remove(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
      return { user: null };
    }),
}));

function getInitialState(): UserStateObj {
  const token = Cookies.get(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
  if (!token) return null;

  const jwt: UserJwt = jose.decodeJwt(token);
  const currentTime = Date.now() / 1000;
  const tokenIsValid = jwt.exp > currentTime;

  if (!tokenIsValid) {
    Cookies.remove(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
    return null;
  }

  return {
    userId: jwt.userId,
    firstName: jwt.firstName,
    lastName: jwt.lastName,
    picture: jwt.picture,
  };
}

type UserJwt = {
  userId: string;
  firstName: string;
  lastName?: string;
  email: string;
  picture: string;
  exp: number;
  iat: number;
};

type UserStateObj = {
  userId: string;
  firstName: string;
  lastName?: string;
  picture: string;
} | null;

interface UserState {
  user: UserStateObj;
  signOut: () => void;
}
