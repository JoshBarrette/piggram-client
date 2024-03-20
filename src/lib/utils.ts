import { redirect } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserStateObj } from "~/hooks/types/user-types";
import { getSignInState } from "~/hooks/useUser";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function isAuthed(): UserStateObj {
  const state = getSignInState();

  if (!state) {
    throw redirect({
      to: "/",
    });
  }

  return state;
}

export function getFullName(firstName: string, lastName?: string): string {
  return firstName + (lastName && ` ${lastName}`);
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}
