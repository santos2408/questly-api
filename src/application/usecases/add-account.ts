import type { CreateAccountDTO } from "./create-account-dto";
import type { AddAccountOutput } from "./add-account-output";

export interface AddAccount {
  add(account: CreateAccountDTO): Promise<AddAccountOutput>;
}
