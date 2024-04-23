import { useEffect, useRef, useState } from 'react'
import obj from './header.module.css'
import Card from './components/usercard'
export default function Header(props){
    const token = props.token
    const setToken = props.setToken
    const setIsLogin = props.setIsLogin
    const[userDetails, setUserDetails] = useState({
        name:'', last_name:''
    })
    const [wantsToSearch, setWantsToSearch] = useState(false)
    const [searchResult, setSeachResult] = useState([])
    let searchRef = useRef();

    useEffect(()=>{
        {
            fetch('http://localhost:8000/api/user/userprofile', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token 
                }
            })
    .then(response => response.json())
      .then(json => {
        setUserDetails({
            name:json.name,
            last_name:json.lastName
        })
      })
        }
        
    }, []
    )
    function handleLogOut(){
        setToken('')
        setIsLogin(false)
        
    }
    return (
        <>
        <header className={obj.headerbar}>
    <div className={obj.userinfo}>
        <div className={obj.useravatar}></div>
        <span className={obj.username}> Welcome {userDetails.name} {userDetails.last_name}</span>
    </div>
    <button className={obj.logoutbutton} onClick={handleLogOut}>Logout</button>
</header>
<br/>
<br/>
<br/>

<style jsx>{`
        .container {
          width: 99.9vw;
          padding: 20px;
          position: relative; /* Set position to relative */
          box-sizing: border-box;
          background-color: #e0e0e0; 
        }
        .close-button {
          position: absolute;
          top: 10px; /* Adjust top positioning */
          right: 15px; /* Adjust right positioning */
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: #999;
        }
        .close-button:hover {
          color: #333;
        }
      `}</style>
        </>
    )
}