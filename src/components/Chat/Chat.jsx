import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages"
import "./Chat.css"
import UsersBox from "../usersBox/UsersBox";


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}

let socket;

const Chat = ({room, setRoom}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('getUser')))
    const [name, setName] = useState('');
    const [showUsers, setShowUsers] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])
    const [generatedId, setGeneratedId] = useState('')
    const ENDPOINT = process.env.REACT_APP_SERVER_HOST //'https://ha-messanger-app.herokuapp.com/'
    const[loading, setLoading] = useState(true)


    //console.log('fromchat.......',user)

    useEffect(() => {
        socket = io(ENDPOINT);

        console.log('fromchat.......',user)


        if (user) {
            const {room, gerid} = queryString.parse(window.location.search)
            setName(`${user.firstName} ${user.lastName}`)

            setGeneratedId(gerid)
            setRoom(room)
            socket.emit('join', {name:`${user.firstName} ${user.lastName}`, room,generatedId:gerid, isAuthed:true, authUser:user}, () => {

            })


        } else  {
            const {name,room,gerid} = queryString.parse(window.location.search)

            setGeneratedId(gerid)
            setName(name)
            setRoom(room)
            socket.emit('join', {name, room,generatedId:gerid, isAuthed:false}, () => {

            })

        }

        return () => {
            socket.emit('disconnect')
            socket.off();

        }



    }, [ENDPOINT, window.location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages(messages => [...messages, message])
        })
        socket.on("roomData", ({users}) => {
            setUsers(users)
        })
    }, [])///chaged

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.replace(/\s/g, '').length === 0) return
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }

    console.log(messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} showUsers={showUsers} setShowUsers={setShowUsers}/>
                <Messages messages={messages} name={name} generatedId = {generatedId}/>
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <UsersBox users={users} showUsers={showUsers}/>
        </div>
    );
};

export default Chat;
