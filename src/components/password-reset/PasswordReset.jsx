import React, {useEffect, useState} from 'react';
import './PasswordReset.css'
import {Link, Redirect, useParams} from "react-router-dom";
import axios from 'axios'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}

const PasswordReset = () => {
    const user = JSON.parse(localStorage.getItem('getUser'))
    const [password, setPassword] = useState("")
    const [passwordRep, setPasswordRep] = useState("")
    const [found, setFound] = useState(true)
    const [message, setMessage] = useState("")
    const [reqDone, setReqDone] = useState(false)
    const {id} = useParams()
    console.log('the id is ',id)

    useEffect(() => {
        const verifyId = async () => {

            const params = {
                id: id,
                justVerify:true
            }
            try{
                const {status} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/password-reset-form`, params)
                console.log('THE STATUS IS',status)
                if(status === 200){
                    setFound(true)
                }

            }catch (e) {
                console.log(e)
                setFound(false)

            }

        }
        verifyId()


    }, [])


    const sendNewPassword = (e) => {
        e.preventDefault()
        if (password !== passwordRep) {
            setMessage('The password fields to not match')
            return
        }

        const sendData = async ()=>{
            try {


                const params = {
                    id: id,
                    justVerify: false,
                    password:password
                }

                const {data} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/password-reset-form`, params)
                setReqDone(true)
                setMessage(data)
            }catch (e) {
                if(e.response) setMessage(e.response.data)
                else setMessage("Connection lost to DB beacause it sucks")
            }
        }
        sendData()
    }

    if (user || !found) return <Redirect to={"/"}/>

    return (
        <div className="password-reset-container">
            <h1>Password Reset</h1>
            <p>{message}</p>
            {!reqDone ?
                <>
                <form className='form-container' onSubmit={(e) => sendNewPassword(e)} method="post">
                    <input onChange={e => setPassword(e.target.value)} name="password" type="password"
                           placeholder="password" required/>
                    <input onChange={e => setPasswordRep(e.target.value)} name="rep-password" type="password"
                           placeholder="Repeat password" required/>
                    <button type="submit">Reset Password</button>
                </form>
                </> :
                <>
                    <Link to={"/login"}><button className="lgn-l">Sign in</button></Link>
                </>
            }

        </div>
    );
};

export default PasswordReset;
