import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Sidebar.scss"
const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/') {
            setActiveLink('home');
        } else if (pathname === '/settings') {
            setActiveLink('settings');
        }
        else if(pathname === "/comments"){
            setActiveLink('comments');
        }
        // Add more conditions for other routes as needed
    }, [location]);

    return (
        <div className="app-sidebar">
            <Link to="/" className={`app-sidebar-link ${activeLink === 'home' ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" /></svg>
            </Link>
            <Link to="/comments" className={`app-sidebar-link ${activeLink === 'comments' ? 'active' : ''}`}>
                <i className="fa-regular fa-comment fa-lg"></i>
            </Link>
            <Link to="/settings" className={`app-sidebar-link ${activeLink === 'settings' ? 'active' : ''}`}>
                <svg className="link-icon feather feather-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <defs />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
            </Link>
        </div>
    );
};

export default Sidebar;