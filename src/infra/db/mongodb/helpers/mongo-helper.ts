import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
    client: null as MongoClient,

    async connect(uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri)
    },

    async disconnect () {
        await this.client.close()
        this.client = null
    },

    getCollection (name: string): Collection {
        return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectiontWithoutId } = collection  
        return Object.assign({}, collectiontWithoutId, { id: _id })
    }

}