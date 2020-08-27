import React, {useEffect, useState} from 'react';
import "./Register.css"
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

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

    useEffect(() => {
        if (user) {


        }
    }, [user])
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
                password: password
            }

            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, params)
                console.log("The response is", res)
                if (res.status === 200) {
                    setMessage('Request succesful')
                    setReqDone(true)
                }
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
            {!reqDone ?
                <form className="form-container" action="#" method="post">
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
                    <button type="submit" onClick={(e) => sendUserInfo(e)}>Register</button>
                    <p>Already have an account? <Link to={"/login"}>Login!</Link></p>
                </form> : <Link to={"/login"}><span className='lgn-l' >Login</span></Link>}
        </div>
    );
};

export default Register;
