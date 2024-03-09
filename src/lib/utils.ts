import { redirect } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSignInState } from "~/hooks/useUser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthed() {
  const state = getSignInState();

  if (!state) {
    throw redirect({
      to: "/",
    });
  }

  return state;
}
