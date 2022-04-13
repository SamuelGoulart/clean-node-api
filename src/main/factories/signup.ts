import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
// import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb-old/log-repository/log'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { AccountMongosseRepository } from '../../infra/db/mongodb/account-repository/account'
import { makeSignUpValidation } from './signup-validation'


export const makeSignUpController = (): Controller => {
   
    // Main
    const salt = 12
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongosseRepository = new AccountMongosseRepository()

    // Infra
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongosseRepository)
    const logMongoRepository = new LogMongoRepository()

    // Presentation
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())

    return new LogControllerDecorator(signUpController, logMongoRepository)
}