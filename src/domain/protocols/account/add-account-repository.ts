import { Account } from "../../entities/account.js";

export interface AddAccountRepository {
  add(account: Account): Promise<void>;
}
