import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/protocols/criptography/hasher'
import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  // Informações específicas da biblioteca são pelo constructor
  // Nem todas as bibliotecas de criptografia tem o salt
  constructor (private readonly salt: number) {}

  // O método do encrypt, faz parte do protocolo, da interface do Hasher
  // No parâmetro do encrypt, só pode passar informções genéricas, que vão servir para qualquer biblioteca de criptografia
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
