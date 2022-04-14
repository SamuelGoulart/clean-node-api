import { makeLoginValidation } from './login-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validationts'
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