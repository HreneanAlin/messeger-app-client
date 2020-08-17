import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages"
import "./Chat.css"

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search)

        socket = io(ENDPOINT);
        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off();

        }

    }, [ENDPOINT, props.location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages(messages => [...messages, message])
        })
    }, [])///chaged

    const sendMessage = (e) => {
        e.preventDefault();

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
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
