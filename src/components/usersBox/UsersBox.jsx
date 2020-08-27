import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import "./UsersBox.css"
import verifiedIcon from "../../icons/verified.png"
const UsersBox = ({users, showUsers}) => {


    return (
        <ScrollToBottom className={showUsers ? "users-container show":"users-container"}>
            <h3>Online Users</h3>
            {users.map(user => <p key={user.id}>{user.verified ?
                <>
                    <img className="verified-img" src={verifiedIcon} alt="verified icon"/>
                    {user.name}
                </>
                : user.name }</p>)}
        </ScrollToBottom>
    );
};

export default UsersBox;
