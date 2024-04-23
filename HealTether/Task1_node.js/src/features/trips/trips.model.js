
export default class TripModel{
    constructor(title, destinations, activities,email, userID){
        this.title = title;
        this.destinations = destinations;
        this.activities = activities;
        this.email = email;
        this.userID = userID
    }
    static addTrip(title, destinations,  activities, email, userID){
        const newTrip = new TripModel(title, destinations, activities, email, userID)
        return newTrip
    }

}