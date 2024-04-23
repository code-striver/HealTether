import express from 'express';
import TripController from './trips.controller.js';
import jwtAuth from "../../middlewares/jwt.middleware.js";
import UserController from '../user/user.controller.js';
const tripController =  new TripController()
const tripRouter = express.Router();
tripRouter.post('/add',jwtAuth, (req, res)=>{
    tripController.addTrip(req, res)
})
tripRouter.get('/userTrips', jwtAuth, (req, res)=>{
    tripController.getUserTrips(req, res)
})
tripRouter.delete('/:id', jwtAuth, (req, res)=>{
    tripController.deleteTrip(req, res)
})
tripRouter.post('/updateTrip/:id', jwtAuth, (req, res)=>{
    tripController.updateTripById(req, res)
})

export default tripRouter;