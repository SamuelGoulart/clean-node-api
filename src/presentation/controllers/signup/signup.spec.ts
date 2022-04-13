import { SignUpController } from './signup'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from './signup-protocols'
import { ok, serverError, badRequest } from '../../helpers/http-helper'

const mackeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    return new EmailValidatorStub()
}

const mackeAddAccount = (): AddAccount => {

    class AddAccountStub implements AddAccount {
        async  add (account: AddAccountModel): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    
    return new AddAccountStub()
}

const makeValidation = (): Validation => {

    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null
        }
    }
    
    return new  ValidationStub()
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name', 
    email: 'valid_email@mail.com',
    password: 'valid_password',  
})

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name', 
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password' 
    }
})

interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
    validationStub: Validation
}

const mackeSut = (): SutTypes => {
    const emailValidatorStub = mackeEmailValidator()
    const addAccountStub = mackeAddAccount()
    const validationStub = makeValidation()
    const sut = new SignUpController(emailValidatorStub, addAccountStub, validationStub)
    return {
        sut,
        emailValidatorStub,
        addAccountStub,
        validationStub
    }
}

describe('Sign Controller', () => {
    
    test('Should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorStub } = mackeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = mackeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        sut.handle(makeFakeRequest())
        expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com")
    })

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = mackeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 500 if addAccount throws', async () => {
        const { sut, addAccountStub } = mackeSut()
        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))  
        })
       
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountStub } = mackeSut()
        const addSpy = jest.spyOn(addAccountStub, 'add')
        sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name', 
            email: 'any_email@mail.com',
            password: 'any_password',
        })
    })
    
    test('Should return 200 if valid data is provided', async () => {
        const { sut }= mackeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeAccount()))
    })

    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = mackeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    
    test('Should return 400 if validation returns an error', async () => {
        const { sut, validationStub }= mackeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})