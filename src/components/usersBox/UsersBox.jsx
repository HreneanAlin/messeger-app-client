import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./UsersBox.css"
import verifiedIcon from "../../icons/verified.png"
import googlePng from "../../icons/google.png"
import facebookPng from "../../icons/facebook.png"

const UsersBox = ({users, showUsers}) => {
    console.log(users)

    return (
        <ScrollToBottom className={showUsers ? "users-container show" : "users-container"}>
            <h3>Online Users</h3>
            {users.map(user => <p key={user.id}>{user.facebookId ?
                <>
                    <img className="verified-img transparent" src={facebookPng} alt="verified icon"/>
                    {user.name}
                </> : user.googleId ?
                    <>
                        <img className="verified-img transparent" src={googlePng} alt="verified icon"/>
                        {user.name}
                    </>
                    : user.verified ? <>
                        <img className="verified-img" src={verifiedIcon} alt="verified icon"/>
                        {user.name}
                    </> : user.name}</p>)}
        </ScrollToBottom>
    );
};

export default UsersBox;
