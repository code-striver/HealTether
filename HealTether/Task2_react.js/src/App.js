import { useEffect, useState } from "react";

import Header from "./header.js";
import LoggingSignupForms from "./components/loginandsignup.js";
import TripCard from "./components/trip.card.js";
import TripForm from "./components/create.trip.form.js";
import AddTripButton from "./components/add.button.js";
import Folowers from "./components/followers.js";
import Following from "./components/following.js";
function App() {
  const [isLogin, setIsLogin]= useState();
  const [token, setToken] = useState('')
  const [wantsToAdd, setWantToAdd] = useState(false)
  const [tripList, setTripList] = useState([])
  const [wantsToUpdate, setWantsToUpdate] = useState(false)
  const [tripToUpdate, setTripToUpdate] =useState(null)
  useEffect(()=>{
    console.log(tripList)
    fetch('http://localhost:8000/api/user/userprofile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token // Attach the token in the Authorization header
                }
            })
    .then(response => response.json())
      .then(json => {
        if(json.result == "not logged in!!!" || json.result=='Unauthorized access')
        setIsLogin(false)
      })
}, [isLogin])
useEffect(()=>{
  console.log('we hit the endpoint userTrips with token')
  console.log(token)
  fetch('http://localhost:8000/api/trips/userTrips', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token // Attach the token in the Authorization header
                }
            })
    .then(response => response.json())
      .then(json => {
        console.log(json)
        setTripList(json)
        console.log('triplist asfter set')
        console.log(tripList)
      })
}, [])
  if(isLogin){
    return (
      <><div className="app-container">
        <div>
        <Header token ={token} setToken ={setToken} setIsLogin = {setIsLogin}/>
        </div>
      <div className="add-trip">
      {wantsToAdd||wantsToUpdate?
      <TripForm token ={token} tripList ={tripList} setWantsToUpdate = {setWantsToUpdate}
      setTripToUpdate = {setTripToUpdate} wantsToAdd = {wantsToAdd}
      wantsToUpdate = {wantsToUpdate} tripToUpdate ={tripToUpdate}
       setTripList ={setTripList} setWantToAdd = {setWantToAdd}/>
       :<AddTripButton setWantToAdd = {setWantToAdd}/>}
      </div>


      <div className="body">
        <div className="followers">
          {/* <h2>Followers</h2> */}
          <Folowers/>
        </div>
        <div className="cards-container">
          {tripList.map((trip)=><TripCard setWantsToUpdate ={setWantsToUpdate}
          setWantToAdd = {setWantToAdd} tripToUpdate = {tripToUpdate}
          setTripToUpdate = {setTripToUpdate}
          token={token} setTripList = {setTripList} tripInfo ={trip}/>)}
      </div>
      <div className="following">
      <Following/>
      </div>
      
      </div>
      

      </div>
      
      <style jsx>{`
        .add-trip {
          width:100%
          border: dotted black 2px;
          left: 50%;
          transform: translateX(-50%, 1%);
          padding-top: 10vh;
        }
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 5%
          width: 80%;
          margin: 0 auto;
        }

        .followers {
          max-width:10%
        }
        .following {
          max-width:10%
        }
        .body {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100vw;
        }
        .body > * {
          flex: 1;
        }
      `}</style>
        </>
        
    )
  }
  else return (
    <div className="App">
      
        <LoggingSignupForms setTripList= {setTripList} setIsLogin = {setIsLogin} setToken = {setToken} token = {token}/>
    </div>
  );
}

export default App;
