import bcrypt from 'bcrypt'
import { Encrypter } from "../../data/protocols/encrypter"

export class BcryptAdapter implements Encrypter {
    private readonly salt: number

    // Informações específicas da biblioteca são pelo constructor
    // Nem todas as bibliotecas de criptografia tem o salt
    constructor (salt: number){
        this.salt = salt
    }

    // O método do encrypt, faz parte do protocolo, da interface do Encrypter
    // No parâmetro do encrypt, só pode passar informções genéricas, que vão servir para qualquer biblioteca de criptografia
    async encrypt(value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }
}