import mongoose from "mongoose";
import { Schema } from "mongoose";
const ContactSchema = new Schema({
    title:String,
    destinations:String,
    activities:String,
    email:String,
    userID:{type:mongoose.Schema.Types.ObjectId, ref:'users'}
})
export default ContactSchema