import React, {useState} from 'react';
import {Link} from "react-router-dom";
import  './Join.css'

const Join = ({guest, setGuest, room, setRoom, userName}) => {

if(!userName) return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>
                    Join as Guest
                </h1>
                <div><input placeholder="Name" className='joinInput' type="text"
                  onChange={(event)=> setGuest(event.target.value)}/></div>
                <div><input placeholder="Room" className='joinInput mt-20' type="text"
                  onChange={(event => setRoom(event.target.value))}/></div>
                <Link onClick={event => (!guest || !room) ? event.preventDefault() : null} to={`/chat?name=${guest}&room=${room}`}>
                    <button className="button mt-20" type="submit">Enter Room</button>
                </Link>
                <Link to={"/register"}>Register</Link>
                <Link to={"/login"}>Sign in</Link>

            </div>
        </div>
    );
    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>
                    Wellcome {userName}
                </h1>

                <div><input placeholder="Room" className='joinInput mt-20' type="text"
                            onChange={(event => setRoom(event.target.value))}/></div>
                <Link onClick={event => (!room) ? event.preventDefault() : null} to={`/chat?name=${userName}&room=${room}`}>
                    <button className="button mt-20" type="submit">Enter Room</button>
                </Link>
                <Link to={"/register"}>Register</Link>

            </div>
        </div>
    );

};

export default Join;
