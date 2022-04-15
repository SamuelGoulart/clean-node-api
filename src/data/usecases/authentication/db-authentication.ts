import { AuthenticationModel, Authentication } from "../../../domain/usecases/authentication"
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
     
    constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository){
         this.loadAccountByEmailRepository = loadAccountByEmailRepository
    }

    async auth(Authentication: AuthenticationModel): Promise<string> {
        await this.loadAccountByEmailRepository.load(Authentication.email)
        return null
    }
}