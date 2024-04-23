import { useRef, useState } from 'react';
import obj from '../logginForm.module.css'
import Cookies from 'js-cookie';
export default function LoggingSignupForms(props) {

    // Login form

    const setToken = props.setToken;
    const setIsLogin = props.setIsLogin;
    const setTripList = props.setTripList
    let token = props.token
    const [message, setMessage] = useState('')
   const emailRef = useRef();
   const passwordRef = useRef();

   function handleLoginSubmit(e){
    e.preventDefault();
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:8000/api/user/signin', requestOption)
    .then(response => response.json())
      .then(json => {
        console.log('received from user/signin')
        if(json.loginProb){
            setMessage(json.loginProb)
        }
        console.log(json.token)
        if(json.token){
            setToken(json.token)
            fetch('http://localhost:8000/api/trips/userTrips', {
                  method: 'GET', 
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': json.token // Attach the token in the Authorization header
                  }
              })
      .then(response => response.json())
        .then(json => {
          setTripList(json)
          setIsLogin(true)
        })
        }

      })
      .catch(error => {
        console.error('Error:', error);
        setIsLogin(false); // Set login status to false in case of error
    });
   }

   //Signup Form
   const signUpEmailRef = useRef()
   const signUpPaswordRef = useRef();
   const nameRef = useRef();
   const lastNameRef = useRef();
   function handleSignUpSubmit(e){
    e.preventDefault()
    const signUpRequestOption = {
        method: 'POST',
        body: JSON.stringify({
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            email: signUpEmailRef.current.value,
            password:signUpPaswordRef.current.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('http://localhost:8000/api/user/signup', signUpRequestOption)
    .then((result)=> result.json())
    .then((json)=>{
        if(json.errors){
            setMessage(`${json.errors[0].msg}`)
        }else{
        setMessage(`${json.name}, ${json.message}`)
        signUpEmailRef.current.value = ''
        nameRef.current.value = ''
        lastNameRef.current.value = ''
        signUpPaswordRef.current.value =''
        }
    })
    .catch((error)=>{
        console.log(`error from signup handler ${error}`)
    })

   }

  return (
    <>
    {message&&<span className='message'>{message}</span>}
      <div className={obj.container}>
          <div className={obj.loginsignupbox}>
              <div className={obj.loginbox}>
                  <h2 className={obj.heading}>Login</h2>
                  <form onSubmit={handleLoginSubmit}>
                      <input type="email" className={obj.inputfield}
                      placeholder="Email" name='email' ref={emailRef} required/>
                      <input type="password" required className={obj.inputfield} placeholder="Password" ref={passwordRef}/>
                      <button className= {obj.submitbutton}>Login</button>
                  </form>
              </div>
              <div className={obj.signupbox}>
                  <h2 className={obj.heading}>Sign Up</h2>
                  <p className={obj.subheading}>It's quick and easy.</p>


                  {/* Sign up form */}



                  <form onSubmit={handleSignUpSubmit}>
                      <input required ref={nameRef} type="text" className={obj.inputfield} placeholder="First Name" />
                      <input required ref={lastNameRef} type="text" className={obj.inputfield} placeholder="Last Name" />
                      <input required ref={signUpEmailRef} type="email" className={obj.inputfield} placeholder="Email" />
                      <input required ref={signUpPaswordRef} type="password" className={obj.inputfield} placeholder="Password" />
                      <button className={obj.submitbutton}>Sign Up</button>
                  </form>
              </div>
          </div>
      </div>
      <style jsx>{`
  .message {
    display: block;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 20px;
  }
`}</style>

      </>
  );
}
