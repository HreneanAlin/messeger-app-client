import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import  './Join.css'
import { v4 as uuidv4 } from 'uuid';
const Join = ({guest, setGuest, room, setRoom, logOut}) => {
const [user,setUser] = useState(JSON.parse(localStorage.getItem('getUser')))
const [notlogged,setNotLogged] = useState(!user)


const logOutFromPage = ()=>{
    logOut()
    setNotLogged(true)
}
    console.log(user)
if(notlogged) return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>
                    Join as Guest
                </h1>
                <div><input placeholder="Name" className='joinInput' type="text"
                  onChange={(event)=> setGuest(event.target.value)}/></div>
                <div><input placeholder="Room" className='joinInput' type="text"
                  onChange={(event => setRoom(event.target.value))}/></div>
                <Link onClick={event => (!guest || !room) ? event.preventDefault() : null} to={`/chat?name=${guest}&room=${room}&gerid=${uuidv4()}`}>
                    <button className="button-chat" type="submit">Enter Room</button>
                </Link>
                <div>
                <Link  to={"/register"}>
                    <span className='register-l' >Register</span>
                </Link>
                </div>
                <div>
                <Link to={"/login"}>
                    <span className='login-l'>Sign in</span>
                </Link>
                </div>

            </div>
        </div>
    );
    return (
        <div  className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>
                    Welcome {user.firstName} {user.lastName}
                </h1>

                <div><input placeholder="Room" className='joinInput' type="text"
                            onChange={(event => setRoom(event.target.value))}/></div>
                <Link onClick={event => (!room) ? event.preventDefault() : null} to={`/chat?room=${room}&gerid=${uuidv4()}`}>
                    <button className="button-chat" type="submit">Enter Room</button>
                </Link>
                <button className="log-out-btn" onClick={()=> logOutFromPage()} >Log Out</button>

            </div>
        </div>
    );

};

export default Join;
