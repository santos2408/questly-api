import type { Status } from "../../../domain/constants/status.js";
import type { Roles } from "../../../domain/constants/roles.js";

export type AddAccountOutput = {
  id: string;
  name: string;
  email: string;
  status: Status;
  role: Roles;
  createdAt: Date;
};
