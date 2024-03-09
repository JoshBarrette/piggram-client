import * as jose from "jose";
import Cookies from "js-cookie";
import { create } from "zustand";
import { router } from "~/main";
import { UserJwt, UserState, UserStateObj } from "./types/user-types";

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
  user: getSignInState(),
  signOut: () =>
    set(() => {
      Cookies.remove(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
      return { user: null };
    }),
}));

export function getSignInState(): UserStateObj {
  const token = Cookies.get(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
  if (!token) return null;

  const jwt: UserJwt = jose.decodeJwt(token);
  const currentTime = Date.now() / 1000;
  const tokenIsExpired = jwt.exp * 1000 < currentTime;

  if (tokenIsExpired) {
    Cookies.remove(import.meta.env.VITE_APP_JWT_COOKIE_NAME);
    return null;
  } else if (!UserJwt.safeParse(jwt).success) {
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
