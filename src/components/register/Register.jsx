import React, {useEffect, useState} from 'react';
import "./Register.css"
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}
const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRep, setPasswordRep] = useState("")
    const [message, setMessage] = useState("")
    const [reqDone, setReqDone] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('getUser')));


    const sendUserInfo = (e) => {

       e.preventDefault()

        if (password !== passwordRep) {
            setMessage('The password fields to not match')
            return
        }

        const sendData = async () => {
            const params = {
                date: Date.now(),
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password,
                verificationId: uuidv4()
            }

            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/register`, params)
                console.log("The response is", res)
                console.log(res)
                    setMessage(res.data)
                    setReqDone(true)

            } catch (e) {
                if(e.response) setMessage(e.response.data)
                else setMessage("Connection lost to DB beacause it sucks")

            }
        }
        sendData()

    }
    if(user) return <Redirect to={"/login"}/>

    return (
        <div className="register-container">
            <h1>Register</h1>
            <p>{message}</p>
            {!reqDone  ?
                <form className="form-container" onSubmit={(e)=>sendUserInfo(e)} method="post"  >
                    <input onChange={e => setFirstName(e.target.value)} name="fname" type="text"
                           placeholder="first name" required/>
                    <input onChange={e => setLastName(e.target.value)} name="lname" type="text" placeholder="last name"
                           required/>
                    <input onChange={e => setUserName(e.target.value)} name="uname" type="text" placeholder="username"
                           required/>
                    <input onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="email"
                           required/>
                    <input onChange={e => setPassword(e.target.value)} name="password" type="password"
                           placeholder="password" required/>
                    <input onChange={e => setPasswordRep(e.target.value)} name="rep-password" type="password"
                           placeholder="Repeat password" required/>
                    <button type="submit" >Register</button>
                    <button type="reset" >Reset</button>
                    <p>Already have an account? <Link to={"/login"}>Login!</Link></p>
                </form> :
                <>
                    <p>An email was send to {email}. Please click the confirmation link in the mail for validation</p>
                <Link to={"/"}><span className='go-back' >Go Back</span></Link>
                </>
            }
        </div>
    );
};

export default Register;
