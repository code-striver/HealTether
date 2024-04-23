import UserModel from "./user.model.js";
// import { UserRepository } from "./user.repository.js";
import UserMongooseRepository from "./user.repos.mongoose.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export default class UserController{
    constructor(){
        this.userRepository = new UserMongooseRepository()
    }
    async signUp(req, res){
        const {name, lastName, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = UserModel.signUp(name, lastName, email, hashedPassword)
        const response = await this.userRepository.signup(user)
        res.status(201).send(response)
    }
    async loginUser(req, res){
        const {email, password} = req.body;
        const verifiedByEmail = await this.userRepository.findByEmail(email);
        if(!verifiedByEmail){
            res.status(400).send({loginProb:'Incorrect Email'})
        }else{
            const verificationBoolean = await (bcrypt.compare(password,
                verifiedByEmail.password))
                //creating JWT for successful login
            if(verificationBoolean){
                const token = jwt.sign({UserID:verifiedByEmail._id, 
                    email:verifiedByEmail.email}, 'gAmhmrCfWSl9CdRuFZ6SIS1zYXohdmjHFFuUcck', {
                        algorithm:'HS256',
                        expiresIn: '10h'
                    })
                return res.cookie('jwt', token).status(200).send({name:verifiedByEmail.name, result:"you are in",token}) 
            }else{
                return res.status(400).send({loginProb:'Incorrect password'})
            } 
        }
    }
    
    signOut(req, res){
        if(req.cookies){
            res.clearCookie('jwt').send('you have been logged out')
        }else{
            res.send('you are not logged in')
        }
    }
    async sendUserProfile(req, res){
        const result = await this.userRepository.findById(req.userID);
        return res.send(result)
        
    }
}
