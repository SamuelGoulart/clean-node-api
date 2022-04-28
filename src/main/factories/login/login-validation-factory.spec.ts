import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'
import { makeLoginValidation } from './login-validation-factory'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const mackeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    return new EmailValidatorStub()
}


describe('LoginValidation Factory', () => {
    test('Should call ValidationComposite with all validation', () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', mackeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})