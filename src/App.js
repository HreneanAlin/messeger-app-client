import React, {useState} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import "./variables.css"
import Register from "./components/register/Register";
import Login from "./components/login/Login";


const App = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [userName,setUserName] = useState("")
    const [guest,setGuest] = useState("")
    const [room,setRoom] = useState('')
    return (
        <Router>
            <Route path='/' exact >
                <Join guest={guest}
                      setGuest={setGuest}
                      room={room}
                      setRoom = {setRoom}
                       userName ={userName}/>
            </Route>
            <Route path='/register' >
                <Register/>
            </Route>
            <Route path='/chat' >
                <Chat firstName = {firstName}
                      lastName = {lastName}
                      userName={userName}
                      guest ={guest}
                      room = {room}
                      setRoom = {setRoom}/>
            </Route>
            <Route path='/login' >
                <Login firstName = {firstName}
                       lastName = {lastName}
                       userName={userName}
                       setFirstName={setFirstName}
                       setLastName = {setLastName}
                       setUserName={setUserName} />
            </Route>

        </Router>
    );
};

export default App;
