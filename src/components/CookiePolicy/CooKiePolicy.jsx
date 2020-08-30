import React from 'react';
import './CookiePolicy.css'
const CookiePolicy = () => {
    return (
        <div className="cookie-container-outer">
        <div className="cookie-container">
            <h2 className="h2-cookie">
                <span>currently we do not use any cookies, just the local storage!</span>
            </h2>
        </div>
        </div>
    );
};

export default CookiePolicy;
