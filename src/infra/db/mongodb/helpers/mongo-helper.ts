import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

    async connect(uri: string): Promise<void> {
        this.uri = uri
        this.client = await MongoClient.connect(process.env.MONGO_URL as string)
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