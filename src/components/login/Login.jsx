import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string'
import "./Login.css"
import JWTDecrypt from "../../JWT/JWTDecryptor"
import facebookPng from"../../icons/facebook.png"
import googlePng from "../../icons/google.png"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}
const Login = ({logOut}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('getUser')));
    const [userNameTry, setUserNameTry] = useState("")
    const [password, setPassword] = useState("")
    const [notLoged, setNotLoged] = useState(!user)
    const [message,setMessage] = useState("")
    useEffect(()=>{
        if(user) return;
        const {tkn} = queryString.parse(window.location.search)
        if(!tkn) return;

        const data = JWTDecrypt(tkn)
        localStorage.setItem('getUser', JSON.stringify(data))
        setUser(JSON.parse(localStorage.getItem('getUser')))
        setNotLoged(!data.firstName)

    },[])

    const sendData = (e) => {
        e.preventDefault()
        if (!userNameTry || !password) return
        const params = {
            userName: userNameTry,
            password: password
        }
        const send = async () => {


            try {
                const {data,status} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/login`, params)



                if(data.firstName){
                    localStorage.setItem('getUser', JSON.stringify(data))
                    setUser(JSON.parse(localStorage.getItem('getUser')))
                    setNotLoged(!data.firstName)
                }else {
                    setMessage('This site recieve' +
                        '  information from a free online mySql Db that right know is not working, Please try again latter')

                }

                console.log('User from storage',user)

            } catch (e) {
                if(e.response) {
                    console.log("this is the e", e.response)
                    setMessage(e.response.data)
                }else setMessage('This site recieve' +
                    '  information from a free online mySql Db that right know is not working, Please try again latter')


            }
        }
        send()
    }

const googleAuth= (e)=>{


}

const logOutFromPage = ()=>{
        logOut()
        setNotLoged(true)
}

    return (
        <div className="login-container">
            {notLoged ?
                <div >
                    <h1>Log In</h1>
                <form className='form-container'>
                    <div >
                        <p>{message}</p>
                        <input onChange={e => setUserNameTry(e.target.value)} type="text" placeholder="username"/>
                    </div>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
                    </div>
                    <div>
                        <button onClick={(e) => sendData(e)}>Log In</button>
                        <Link to={"/"}>
                            <button className="back-span">Go Back</button>
                        </Link>
                        <p>Don't have an account? <Link to={"/register"}>Create one!</Link></p>
                        <p>Forgot you password? Click <Link to={"/password-recovery"}>here!</Link></p>
                        <div className="outside-login-container">
                        <a className="google-login" href={`${process.env.REACT_APP_SERVER_HOST}/google`}>
                            <img src={googlePng} alt="login with google"/>
                            Log in with Google</a>
                        <a className="facebook-login" href={`${process.env.REACT_APP_SERVER_HOST}/facebook`}>
                            <img src={facebookPng} alt="login with facebook"/>
                            Log in with Facebook</a>
                        </div>


                    </div>
                </form> </div> : <>
                    <h1>Welcome {user.userName}</h1>
                    <div>
                        <Link to={"/"}>
                            <span className="button-chat">Join a Room</span>
                        </Link>
                        <button className="log-out-btn" onClick={() => logOutFromPage()}>Log Out</button>
                    </div>
                   </>}

        </div>
    );
};

export default Login;
