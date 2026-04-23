import type { Status } from "../../../domain/enums/status";
import type { Roles } from "../../../domain/enums/roles";

export type AddAccountOutput = {
  id: string;
  name: string;
  email: string;
  status: Status;
  role: Roles;
  createdAt: Date;
};
