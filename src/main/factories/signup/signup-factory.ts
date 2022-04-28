import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb-old/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb-old/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
// import { AccountMongosseRepository } from '../../../infra/db/mongodb/account-repository/account'
import { makeSignUpValidation } from './signup-validation-factory'


export const makeSignUpController = (): Controller => {
   
    // Main
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()

    // Infra
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const logMongoRepository = new LogMongoRepository()

    // Presentation
    const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())

    return new LogControllerDecorator(signUpController, logMongoRepository)
}