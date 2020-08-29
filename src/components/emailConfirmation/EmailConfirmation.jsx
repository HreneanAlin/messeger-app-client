import React, {useEffect, useState} from 'react';
import './EmailConfirmation.css'
import axios from 'axios'
import {useParams, Redirect} from "react-router-dom";

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
        <div>
            <p>Your email was confirmed</p>

        </div>
    );

    return <Redirect to={"/"}/>
};

export default EmailConfirmation;
