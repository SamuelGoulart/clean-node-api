export interface UpdateAcessTokenRepository {
    updateAccesToken (id: string, token: string): Promise<void> 
}