import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';

const TripForm = (props) => {
    const setWantToAdd = props.setWantToAdd;
    const setWantsToUpdate = props.setWantsToUpdate;
    const setTripToUpdate = props.setTripToUpdate
    const wantsToAdd = props.wantsToAdd
    const wantsToUpdate = props.wantsToUpdate
    const token = props.token;
    const tripList = props.tripList;
    const setTripList = props.setTripList
    const tripToUpdate = props.tripToUpdate
  const titleRef = useRef(); //changed to contact name
  const destinationRef = useRef(); // changed to relationship
  const activitiesRef = useRef(); // changed to phone number
  const emailRef = useRef(); // email ref
  useEffect(()=>{
    console.log(tripToUpdate)
    if(wantsToUpdate){
        titleRef.current.value = tripToUpdate.title
            destinationRef.current.value = tripToUpdate.destinations
             activitiesRef.current.value = tripToUpdate.activities
             emailRef.current.value = tripToUpdate.email
      }
  },[tripToUpdate])

    function handleClose(e){
        e.preventDefault();
        setWantToAdd(false)
        setWantsToUpdate(false)
        setTripToUpdate(null)
    }
  async function handleSubmit(e){
    e.preventDefault();
    if(wantsToAdd){
      const tripRequestOprtions = {
        title:titleRef.current.value, //title = name
        destinations:destinationRef.current.value, //destination = relation
         activities:activitiesRef.current.value, //activities = phone number
         email:emailRef.current.value //email a new field
      }
      await fetch('http://localhost:8000/api/trips/add', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Attach the token in the Authorization header
        },
        body:JSON.stringify(tripRequestOprtions)
    })
    await fetch('http://localhost:8000/api/trips/userTrips', {
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
          titleRef.current.value = ''
          destinationRef.current.value = ''
           activitiesRef.current.value = ''
           emailRef.current.value = ''
           titleRef.current.focus()
    }
    else if(wantsToUpdate){
      const tripRequestOprtions = {
        title:titleRef.current.value, 
        destinations:destinationRef.current.value, 
         activities:activitiesRef.current.value,
         email:emailRef.current.value
      }
      await fetch(`http://localhost:8000/api/trips/updateTrip/${tripToUpdate._id}`, {
        method: 'POST', // Assuming userprofile endpoint expects a GET request
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Attach the token in the Authorization header
        },
        body:JSON.stringify(tripRequestOprtions)
    })
    await fetch('http://localhost:8000/api/trips/userTrips', {
                    method: 'GET', // Assuming userprofile endpoint expects a GET request
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token // Attach the token in the Authorization header
                    }
                })
        .then(response => response.json())
          .then(json => {
            setTripList(json)
          })
          titleRef.current.value = ''
          destinationRef.current.value = ''
           activitiesRef.current.value = ''
           emailRef.current.value = ''
           setWantsToUpdate(false)
    }
    
  };

  return (
    <div className="trip-form">
      <button className="close-button" onClick={handleClose}>X</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Contact Name:</label>
        <input
        ref={titleRef}
          type="text"
          id="title"
          placeholder='enter name of your contact...'
        />

        <label htmlFor="destinations">Relation:</label>
        <input
        ref={destinationRef}
          type="text"
          id="destinations"
          placeholder='whats your relation with this person'
        />

        

        <label htmlFor="activities">Phone Number:</label>
        <input
        ref={activitiesRef}
          id="activities"
          placeholder='enter phone number of the contact'
        />

        <label htmlFor="activities">Email:</label>
        <input
        ref={emailRef}
          id="activities"
          placeholder='enter email of the contact'
        />

        <button type="submit" >Submit</button>
      </form>

      {/* Styles */}
      <style jsx>{`
        .trip-form {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          color:black;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TripForm;
