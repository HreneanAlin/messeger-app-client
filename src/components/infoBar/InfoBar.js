import React from 'react';
import './InfoBar.css'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

const InfoBar = ({room , showUsers, setShowUsers}) => {
    return (
        <div className='infoBar'>
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="online" className="onlineIcon"/>
                <h3>{room}</h3>
                <button className="show-button" onClick={()=>setShowUsers(!showUsers)}>Show users</button>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close"/></a>

            </div>
        </div>
    );
};

export default InfoBar;
