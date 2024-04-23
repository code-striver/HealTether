import mongoose from "mongoose"
import contactSchema from "./contactSchema.js"
import { ObjectId } from "mongodb"
const ContactModel = mongoose.model('trips', contactSchema)
export default class ContactsMongooseRepository{

    async addTrip(newTrip){
        try {
            const newContact = new ContactModel(newTrip) 
            return await newContact.save()
        } catch (error) {
           console.log(`error in contact mongoose repository addTrip ${error}`)
        } 
    }
    async getUserTripsById(id){
        try {
            const result = await ContactModel.find({userID:new ObjectId(id)})
            return result 
        } catch (error) {
            console.log(`error in contact mongoose repository getUserTripsById ${error}`)
        }   
    }
    async deleteTrip(id){
        try {
           return await ContactModel.deleteOne({_id: new ObjectId(id)})
        } catch (error) {
            console.log(`error in contact mongoose repository deleteTrip ${error}`) 
        } 
    }
    async updateTripById(id, updatedTrip){
        const result =await ContactModel.updateOne({_id:new ObjectId(id)}, { $set: updatedTrip })
        return result
    }
    
}