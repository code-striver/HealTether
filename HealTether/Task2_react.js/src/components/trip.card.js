import { useState, useEffect } from 'react'
import obj from '../tripcard.module.css'
export default function Triplist(props){
  const token = props.token
  console.log('token inside TripList component')
  console.log(token)
  const setTripList = props.setTripList
  const setWantsToUpdate = props.setWantsToUpdate
  const setTripToUpdate = props.setTripToUpdate
  const setWantToAdd = props.setWantToAdd
 const tripInfo = props.tripInfo
 async function handleXclick(e, id){
  e.preventDefault();
 await fetch(`http://localhost:8000/api/trips/${id}`,{
    method: 'DELETE', 
    headers: {
        'authorization': token // Attach the token in the Authorization header
    }
})
fetch('http://localhost:8000/api/trips/userTrips', {
                  method: 'GET', 
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': token // Attach the token in the Authorization header
                  }
              })
      .then(response => response.json())
        .then(json => {
          console.log('json after pressing X')
          console.log(json)
          setTripList(json)
        })
 }
 function handleUpdateClick(e, trip){
  console.log('tripdToUpdate inside handleUpdateClick')
  console.log(trip)
  e.preventDefault();
  setWantsToUpdate(true)
  setTripToUpdate(trip)
  setWantToAdd(false)
 }
    return (
        <>
        <div className={obj.tripcard}>
    <div className={obj.actions}>
      <button className={obj.updatebutton} onClick={(e)=>handleUpdateClick(e, tripInfo)}>Update</button>
      <button className={obj.deletebutton} onClick={(e)=>handleXclick(e, tripInfo._id)}>X</button>
    </div>
    <div className={obj.tripdetails}>
      <div className={obj.tripheader}>
        <h2 className={obj.tripname}>{tripInfo.title}</h2> 
      </div>
      <div className={obj.destinations}>
        <div className={obj.destination}>
          <h3 className={obj.destinationname}>
          {tripInfo.title} is your {tripInfo.destinations}</h3>
            <h3 className={obj.destinationname}>
            Phone number: {tripInfo.activities}</h3>
            <h3 className={obj.destinationname}>
            Email: {tripInfo.email}</h3>

        </div>
      </div>
    </div>
  </div>
        </>
    )
}