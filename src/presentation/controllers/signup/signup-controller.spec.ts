import { SignUpController } from './signup-controller'
import { MissingParamError, ServerError } from '../../errors'
import { AccountModel, AddAccount, AddAccountModel, HttpRequest, Validation } from './signup-controller-protocols'
import { ok, serverError, badRequest } from '../../helpers/http/http-helper'

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
    addAccountStub: AddAccount
    validationStub: Validation
}

const mackeSut = (): SutTypes => {
    const addAccountStub = mackeAddAccount()
    const validationStub = makeValidation()
    const sut = new SignUpController(addAccountStub, validationStub)
    return {
        sut,
        addAccountStub,
        validationStub
    }
}

describe('Sign Controller', () => {
  
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