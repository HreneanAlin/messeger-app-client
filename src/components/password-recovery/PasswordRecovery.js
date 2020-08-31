import React, {useState} from 'react';
import "./PasswordRecovery.css"
import {Link, Redirect} from "react-router-dom";
import axios from "axios"
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}

const PasswordRecovery = () => {
    const user = JSON.parse(localStorage.getItem('getUser'))
    const [email,setEmail] = useState('')
    const [message, setMessage] = useState("")
    const [reqDone, setReqDone] = useState(false)

    const sendEmail = (e)=>{
        e.preventDefault()
        const sendData = async ()=>{
            try{
                const params = {
                    email:email
                }
                const{data,status} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/password-recovery`,params)
                setMessage(data)
                setReqDone(true)

            }catch (e) {
                if(e.response){
                    console.log(e.response)
                    setMessage(e.response.data)
                }
                else setMessage("Connection lost to DB beacause it sucks")

            }
        }
        sendData()

    }

    if(user) return  <Redirect to={"/"}/>

    return (
        <div className="password-recovery-container">
            <h1>Forgot your password?</h1>
            <p>{message}</p>
            { !reqDone ?
                <>
                <form className="form-container" onSubmit={e => sendEmail(e)} method="post">
                    <input  onChange={e => setEmail(e.target.value)} type="email" placeholder="email" required/>
                    <button type="submit">Send email</button>
                </form>
                </> :
                <>
                    <p>An email was send to {email}. Please click the link from the email to reset your password!</p>
                </>
            }
            <Link to={!reqDone ? '/login':'/'}><span className="go-back">Go back</span></Link>

        </div>
    );
};

export default PasswordRecovery;
