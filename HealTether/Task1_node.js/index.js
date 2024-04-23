import express  from "express";
import bodyParser from "body-parser";
// import { connectToMongoDB } from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import cookieParser from "cookie-parser";
import tripRouter from "./src/features/trips/trips.route.js";
import cors from 'cors'
import userRouter from "./src/features/user/user.route.js";
const server =  express();
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cors())

server.use(cookieParser())

server.use(bodyParser.json())

server.use('/api/user', userRouter)
server.use('/api/trips', tripRouter)


server.listen(8000, ()=>{
    console.log('server is running at localhost 8000')
    // connectToMongoDB()
    connectUsingMongoose()
})