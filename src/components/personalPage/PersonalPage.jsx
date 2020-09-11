import React, {useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from 'axios'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}

const PersonalPage = () => {
    const user = JSON.parse(localStorage.getItem('getUser'));

    useEffect(() => {
        const sendData = async () => {



            const params={
                token:user.token
            }
            const {data} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/user-information`,params)
            console.log(data)
        }
        sendData()
    }, [])

    if (!user) return <Redirect to={"/"}/>
    return (
        <div>
            Hey User !
        </div>
    );
};

export default PersonalPage;
