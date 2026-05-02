import type { CreateAccountDTO } from "./create-account-dto.js";
import type { AddAccountOutput } from "./add-account-output.js";

export interface AddAccount {
  add(accountDTO: CreateAccountDTO): Promise<AddAccountOutput>;
}
