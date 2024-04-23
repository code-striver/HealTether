import mongoose from "mongoose";
import { Schema } from "mongoose";
export const userSchema = new Schema({
    name:String,
    lastName:String,
    email:{type:String, unique:true},
    password:String
})