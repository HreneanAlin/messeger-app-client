import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import "./Login.css"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}
const Login = ({logOut}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('getUser')));
    const [userNameTry, setUserNameTry] = useState("")
    const [password, setPassword] = useState("")
    const [notLoged, setNotLoged] = useState(!user)
    const [message,setMessage] = useState("")
    const sendData = (e) => {
        e.preventDefault()
        if (!userNameTry || !password) return
        const params = {
            userName: userNameTry,
            password: password
        }
        const send = async () => {


            try {
                const {data,status} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, params)
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, params)

                if(data.firstName){
                    localStorage.setItem('getUser', JSON.stringify(data))
                    setUser(JSON.parse(localStorage.getItem('getUser')))
                    setNotLoged(!data.firstName)
                }else {
                    setMessage('This site recieve' +
                        '  information from a free online mySql Db that right know is not working, Please try again latter')
                    console.log("The result ",res)
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
                        <p>Don't have an account? <Link to={"/register"}>Create one!</Link></p>
                    </div>
                </form> </div> : <>
                    <h1>Wellcome {user.userName}</h1>
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
