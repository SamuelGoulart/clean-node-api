export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missig param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
