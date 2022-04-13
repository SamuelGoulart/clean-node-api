import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel as Protocols } from "../../../../domain/models/account"

import {AccountModel} from './account-model'

export class AccountMongosseRepository implements AddAccountRepository{
    //Caso queira omitir o password no retorno Promise<Omit<Protocols, 'password'>> 
    async add (accountData: AddAccountModel): Promise<Protocols> {
        const { email, id, name, password} = await AccountModel.create(accountData)
        return {email, id, name, password}
    }
}