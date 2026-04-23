export const STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
