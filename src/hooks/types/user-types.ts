import { z } from "zod";

export const UserJwt = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.optional(z.string()),
  email: z.string(),
  picture: z.string(),
  exp: z.number(),
  iat: z.number(),
});

export type UserJwt = z.infer<typeof UserJwt>;

export type UserStateObj = {
  userId: string;
  firstName: string;
  lastName?: string;
  picture: string;
} | null;

export interface UserState {
  user: UserStateObj;
  signOut: () => void;
}
