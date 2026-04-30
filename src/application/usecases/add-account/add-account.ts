import type { CreateAccountDTO } from "./create-account-dto";
import type { AddAccountOutput } from "./add-account-output";

export interface AddAccount {
  add(accountDTO: CreateAccountDTO): Promise<AddAccountOutput>;
}
