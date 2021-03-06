import React, {useRef} from 'react';
import './Message.css'
import ReactEmoji from 'react-emoji'
import verifiedIcon from "../../icons/verified.png"
import googlePng from "../../icons/google.png"
import facebookPng from "../../icons/facebook.png"
import {v4 as uuidv4} from 'uuid';

const Message = ({message: {user, text}, name, generatedId}) => {
    let isSendByCurrentUser = false

    const parafCurrentUEl = useRef()
    const parafOtherUEl = useRef()

    if (user.generatedId === generatedId && user.name !== 'admin') {
        isSendByCurrentUser = true

    }

    const makeLinks = (paragraphs) => {
        const regexWithHypertext = /(https?:\/\/)\S{1,}/gi
        const regexWithouHypertext = /(www\.)\S{1,}/gi
        let changedParagraphs = paragraphs.map(paragraph => {
            if (typeof paragraph !== 'string') {
                return paragraph
            }
            const words = paragraph.split(' ')
            return words.map(word => {
                if (regexWithHypertext.test(word)) {
                    return <a className="message-link" key={uuidv4()} rel="noopener noreferrer" target="_blank"
                              href={word}>{word}</a>
                }
                if (regexWithouHypertext.test(word)) {
                    return <a className="message-link" key={uuidv4()} rel="noopener noreferrer" target="_blank"
                              href={`http://${word}`}>{word}</a>
                }
                return word.replace(word, `${word} `)
            })

        })
        console.log(changedParagraphs)


        return changedParagraphs
    }


    return (
        isSendByCurrentUser
            ? (
                <div className='messageContainer justifyEnd'>
                    <p className="sentText pr-10">{user.facebookId ?
                        <>
                            <img className="verified-img" src={facebookPng} alt="verified icon"/>
                            {user.name}
                        </> : user.googleId ?
                            <>
                                <img className="verified-img" src={googlePng} alt="verified icon"/>
                                {user.name}
                            </>
                            : user.verified ? <>
                                <img className="verified-img" src={verifiedIcon} alt="verified icon"/>
                                {user.name}
                            </> : user.name}</p>

                    <div className="messageBox background-current-user">
                        <p ref={parafCurrentUEl}
                           className="messageText colorWhite">{makeLinks(ReactEmoji.emojify(text))}</p>
                    </div>
                </div>

            )
            : (
                <div className='messageContainer justifyStart'>

                    <div className="messageBox background-others">
                        <p ref={parafOtherUEl} className="messageText colorDark">{makeLinks(ReactEmoji.emojify(text))}</p>
                    </div>
                    <p className="sentText pl-10">{user.facebookId ?
                        <>
                            {user.name}
                            <img className="verified-img" src={facebookPng} alt="verified icon"/>

                        </> : user.googleId ?
                            <>
                                {user.name}
                                <img className="verified-img" src={googlePng} alt="verified icon"/>

                            </>
                            : user.verified ? <>
                                {user.name}
                                <img className="verified-img" src={verifiedIcon} alt="verified icon"/>
                            </> : user.name}</p>
                </div>

            )
    );
};

export default Message;
