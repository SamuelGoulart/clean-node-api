import { EmailValidation } from './email-validationts'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../errors'

const mackeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const mackeSut = (): SutTypes => {
  const emailValidatorStub = mackeEmailValidator()

  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validarion', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = mackeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = mackeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = mackeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
