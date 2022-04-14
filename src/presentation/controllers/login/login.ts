import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from "./login-protocols";

export class LoginController implements Controller {
    private readonly validator: Validation
    private readonly authentication: Authentication

    constructor (authentication: Authentication, validator: Validation) {
        this.validator = validator
        this.authentication = authentication
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {

            const error = this.validator.validate(httpRequest.body)

            if (error) {
                return badRequest(error)
            }

            const { email, password } = httpRequest.body
            const accessToken = await this.authentication.auth(email, password)

            if (!accessToken) {
                return unauthorized()
            }

            return ok({ accessToken })

        } catch (error) {
            return serverError(error)
        }
    }

}