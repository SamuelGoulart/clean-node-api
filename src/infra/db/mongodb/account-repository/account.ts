import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel as Protocols } from "../../../../domain/models/account"

import {AccountModel} from './account-model'

export class AccountMongosseRepository implements AddAccountRepository{
    async add (accountData: AddAccountModel): Promise<Omit<Protocols, 'password'>> {
        const { email, id, name} = await AccountModel.create(accountData)
        return {email, id, name}
    }
}