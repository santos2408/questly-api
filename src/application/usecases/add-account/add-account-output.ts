import type { Status } from "../../../domain/constants/status";
import type { Roles } from "../../../domain/constants/roles";

export type AddAccountOutput = {
  id: string;
  name: string;
  email: string;
  status: Status;
  role: Roles;
  createdAt: Date;
};
