import { LoginController } from './login' 
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'

describe('Login Controller', () => {
    test('Should return 400 if no email provided', async () => {
        const sut = new LoginController()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse).toEqual(badRequest(new MissingParamError('email')))
    })

    test('Should return 400 if no email provided', async () => {
        const sut = new LoginController()
        const httpRequest = {
            body: {
                email: 'any_email'
            }
        }
        const httResponse = await sut.handle(httpRequest)
        expect(httResponse).toEqual(badRequest(new MissingParamError('password')))
    })
})