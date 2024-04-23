// import TripRepository from "./trips.repository.js"
import TripModel from "./trips.model.js";
import ContactsMongooseRepository from "./contacts.repo.mongoose.js";
export default class TripController{
    constructor(){
        this.tripRepository = new ContactsMongooseRepository()
    }
    async addTrip(req, res){
        const {title, destinations, activities, email} = req.body;
        const userID = req.userID
        const trip = TripModel.addTrip(title, destinations,  activities, email, userID)
        await this.tripRepository.addTrip(trip)
        return res.status(200).send(trip)
    }
    async getUserTrips(req, res){
        console.log('inside getUserTrips controller')
        const userID = req.userID;
        const result = await this.tripRepository.getUserTripsById(userID)
        res.status(200).send(result)
    }
    async deleteTrip(req, res){
        const tripId = req.params.id;
        await this.tripRepository.deleteTrip(tripId)
        return res.send('trip deleted to')
    }
    async updateTripById(req, res){
        console.log('reached updateTripById controller')
        const tripId = req.params.id
        const {title, destinations, activities,email} = req.body;
        const userID = req.userID
        const updatedTrip = TripModel.addTrip(title, destinations, activities,email,userID)
        const result = await this.tripRepository.updateTripById(tripId, updatedTrip)
        return res.send('trip updated')
    }
}