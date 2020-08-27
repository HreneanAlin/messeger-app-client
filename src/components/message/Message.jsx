import React from 'react';
import './Message.css'
import ReactEmoji from 'react-emoji'
import verifiedIcon from "../../icons/verified.png"

const Message = ({message:{ user, text }, name,generatedId}) => {
    let isSendByCurrentUser = false

    const trimmedName = name.trim().toLowerCase()

    if(user.generatedId === generatedId){
        isSendByCurrentUser = true

    }

    return (
      isSendByCurrentUser
        ?(
            <div className='messageContainer justifyEnd'>
                <p className="sentText pr-10">{trimmedName}</p>

               <div className="messageBox background-current-user">
                   <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
               </div>
            </div>

          )
        : (
              <div className='messageContainer justifyStart'>

                  <div className="messageBox background-others">
                      <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                  </div>
                  <p className="sentText pl-10">{user.verified ?
                      <>
                          {user.name}
                          <img className="verified-img" src={verifiedIcon} alt="verified icon"/>

                      </>
                      : user.name}</p>
              </div>

          )
    );
};

export default Message;
