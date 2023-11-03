import React from 'react';
import "./Header.scss"
const Header = () => {
    return (
        <div className="app-header">
            <div className="app-header-left">
                <span className="app-icon"></span>
                <p className="app-name">Admin</p>
            </div>
            <div className="app-header-right">
                <button className="profile-btn">
                    <span>Nigmatov I.</span>
                </button>
            </div>
        </div>
    );
};

export default Header;