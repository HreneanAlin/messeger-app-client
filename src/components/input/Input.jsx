import React from 'react';
import './Input.css'

const Input = ({message,setMessage, sendMessage}) => {
    let text = "       "


    return (
        <form className='form'>
            <input
                className='input'
                type='text'
                placeholder='Type a message...'
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? event.target.value ? sendMessage(event) : null :null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
        </form>
    );
};

export default Input;
