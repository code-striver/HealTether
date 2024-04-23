import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
const UserModel = mongoose.model('users', userSchema);

export default class UserMongooseRepository{
    async signup(newUser){
        try{
        const checkIfEmailExistsAlready = await UserModel.findOne({email:newUser.email})
        if(checkIfEmailExistsAlready){
            return {message:'User already exists'}
        }
        const user = new UserModel(newUser)
        await user.save()
        const result = {message:'Your Account is created', ...newUser}
        return result
        }catch(err){
            console.log(`error in signUp static function of userModel ${err}`)
        }
    }
    // async signup(user){
    //     try {
    //     const newUser = new UserModel(user);
    //     await newUser.save();
    //     return newUser
    //     } catch (error) {
    //         console.log(`error in signup of mongoose repository ${error}`)
    //     } 
    // }
    async signin(email, password){
        try {
          return await UserModel.findOne({email, password})
        } catch (error) {
            
        }
    }
    async findByEmail(email){
        try {
        return await UserModel.findOne({email:email})
       
        } catch (error) {
            console.log(`error in findByEmail of mongoose repository ${error}`)
        }
    }
    async findById(id){
        const result = await UserModel.findById(id)
        return result
    }
} 

