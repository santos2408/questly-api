export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type Roles = (typeof ROLES)[keyof typeof ROLES];
