// import mongoose from 'mongoose'
import { MongoHelper } from '../infra/db/mongodb-old/helpers/mongo-helper'
import env from './config/env'

// (async ()=> {

//     try {

//         await mongoose.connect(env.mongoUrl);
//         app.listen(env.port, ()=> console.log(`Server runnig at ${env.port}`))

//     } catch (error) {
//         console.log(error)
//     }

// })()

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server runnig at ${env.port}`))
  })
  .catch(console.error)
