import React, {useState} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import "./variables.css"
import Register from "./components/register/Register";
import Login from "./components/login/Login";


const App = () => {

    const [guest,setGuest] = useState("")
    const [room,setRoom] = useState('')

    const logOut = () =>{


        localStorage.removeItem('getUser')
    }
    return (
        <Router>
            <Route path='/' exact >
                <Join guest={guest}
                      setGuest={setGuest}
                      room={room}
                      setRoom = {setRoom}
                      logOut = {logOut}/>
            </Route>
            <Route path='/register' >
                <Register/>
            </Route>
            <Route path='/chat' >
                <Chat
                      guest ={guest}
                      room = {room}
                      setRoom = {setRoom}/>
            </Route>
            <Route path='/login' >
                <Login logOut ={logOut} />
            </Route>

        </Router>
    );
};

export default App;
