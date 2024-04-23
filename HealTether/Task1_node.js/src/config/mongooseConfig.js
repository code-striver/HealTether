import mongoose from "mongoose";
const url = 'mongodb://127.0.0.1:27017/healtether'
export const connectUsingMongoose = async ()=>{
    try {
        await mongoose.connect(url)
        console.log('connected to DB using mongoose')
    } catch (error) {
        console.log(`error in mongoose connection ${error}`)
    }
}