import { Account } from "../../entities/account";

export interface AddAccountRepository {
  add(account: any): Promise<void>;
  // TODO: tipar parâmetro corretamente após finalizar a estrutura da entidade Account. Deve receber Account entity
}
