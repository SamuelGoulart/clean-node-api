import mongoose from 'mongoose'
import app from './config/app';

import env from './config/env'


(async ()=> {

    try {
        
        await mongoose.connect(env.mongoUrl);
        app.listen(env.port, ()=> console.log(`Server runnig at ${env.port}`))

    } catch (error) {
        console.log(error)
    }


})()

