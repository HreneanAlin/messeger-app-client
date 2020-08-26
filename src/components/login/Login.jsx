import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import "./Login.css"

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}
const Login = ({setFirstName, setLastName, setUserName, firstName, lastName, userName}) => {
    const [userNameTry, setUserNameTry] = useState("")
    const [password, setPassword] = useState("")
    const [loged, setLoged] = useState(false)
    const sendData = (e) => {
        e.preventDefault()
        if (!userNameTry || !password) return
        const params = {
            userName: userNameTry,
            password: password
        }
        const send = async () => {


            try {
                const {data} = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, params)
                console.log(data)
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setUserName(data.userName)
                setLoged(true)

            } catch (e) {
                console.log(e)

            }
        }
        send()
    }

    const logOut = () =>{
        setFirstName('')
        setLastName('')
        setUserName('')
        setLoged(false)
    }

    return (
        <div>
            {!loged ?
                <form>
                    <div>
                        <input onChange={e => setUserNameTry(e.target.value)} type="text" placeholder="username"/>
                    </div>
                    <div>
                        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
                    </div>
                    <div>
                        <button onClick={(e) => sendData(e)}>Log In</button>
                    </div>
                </form> : <>
                    <h1>wellcome {firstName} {lastName} with the userName{userName}</h1>
                        <Link to={"/"}>Join a Room</Link>
                        <button onClick={() => logOut()}>Log Out</button>
                   </>}

        </div>
    );
};

export default Login;
