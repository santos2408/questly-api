import type { Account } from "../../domain/entities/account";
import type { CreateAccountDTO } from "./create-account-dto";

export interface AddAccount {
  add(account: CreateAccountDTO): Promise<Account>;
}
