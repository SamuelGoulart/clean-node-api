import { SignUpController } from './signup'

describe('Sign Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const htttpRequest = {
            body: {
                name: 'any_name', 
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password' 
            }
        }
        const htttpResponse = sut.handle(htttpRequest)
        expect(htttpResponse.statusCode).toBe(400)
        expect(htttpResponse.body).toEqual(new Error('Missing param: name'))
    })
})