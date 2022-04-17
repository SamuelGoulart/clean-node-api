import bcrypt from 'bcrypt'
import { Hasher } from "../../data/protocols/criptography/hasher"

export class BcryptAdapter implements Hasher {
    private readonly salt: number

    // Informações específicas da biblioteca são pelo constructor
    // Nem todas as bibliotecas de criptografia tem o salt
    constructor (salt: number){
        this.salt = salt
    }

    // O método do encrypt, faz parte do protocolo, da interface do Hasher
    // No parâmetro do encrypt, só pode passar informções genéricas, que vão servir para qualquer biblioteca de criptografia
    async hash (value: string): Promise<string> {
        const hash = await bcrypt.hash(value, this.salt)
        return hash
    }
}