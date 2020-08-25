import React from 'react';
import ScrollToBottom, {useSticky} from 'react-scroll-to-bottom';
import "./UsersBox.css"
const UsersBox = ({users, showUsers}) => {
    const [sticky] = useSticky();
    console.log(users)
    return (
        <ScrollToBottom className={showUsers ? "users-container show":"users-container"}>
            <h3>Online Users</h3>
            {users.map(user => <p key={user.id}>{user.name}</p>)}
        </ScrollToBottom>
    );
};

export default UsersBox;
