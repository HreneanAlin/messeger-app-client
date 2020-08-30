import React, {useEffect, useState} from 'react';
import './EmailConfirmation.css'
import axios from 'axios'
import {useParams, Redirect, Link} from "react-router-dom";

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}

const EmailConfirmation = () => {
    const [found, setFound] = useState(true)
    const {verifiedId} = useParams()
    useEffect(() => {
        const getData = async () => {
            const params = {
                verifiedId: verifiedId
            }
            try {
                const {status} = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/validation`, params)

                console.log('request send')
                console.log(status)
            } catch (e) {
                if (e.response) {
                    setFound(false)
                }
            }
        }
        getData()

    })


    if (found) return (
        <div className="confirmation-container">
            <h1>Your email was confirmed!</h1>
            <Link to={"/login"}><span className="login-l" >Sign In</span></Link>

        </div>
    );

    return <Redirect to={"/"}/>
};

export default EmailConfirmation;
