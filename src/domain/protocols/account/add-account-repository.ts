import { Account } from "../../entities/account";

export interface AddAccountRepository {
  add(account: Account): Promise<void>;
}
