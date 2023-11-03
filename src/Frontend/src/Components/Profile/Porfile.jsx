import React, { useState, useEffect } from 'react'
import Home from '../Home/Home'
import Delay from '../Delay/Delay';
import "../Shop/Shop.scss"
import { useNavigate } from 'react-router-dom';
import "./Profile.scss"
export default function Porfile() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [offcanvas, setOffcanvas] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [ orders, setOrders] = useState(false)
    function closeOffcanvas() {
        sessionStorage.setItem("profil", false)
        navigate("/")
    }
    function bootstrapBnt() {
        let cur = sessionStorage.getItem("account")
        setOffcanvas(true)
        if (cur !== "") {
            setOffcanvas(cur)
        }
    }
    function viewOrders(){
        if(orders) setOrders(false)
        else setOrders(true)
    }
    function logOut(){
        localStorage.setItem("email", "")
        navigate("/")
    }
    useEffect(() => {
        let email = localStorage.getItem("email")
        console.log(email);
        if ( email !== undefined || email !== null) {
            setUserEmail(email)
        }
        const redirectTimeout = setTimeout(() => {

            bootstrapBnt()
        }, 2000)
        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [])
    useEffect(() => {
        setIsLoading(false)
        const delay = 1000;
        <Delay />
        const redirectTimeout = setTimeout(() => {
            setIsLoading(true)
        }, delay);

        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [])
    return (
        <div>

            {!isLoading ? <Delay /> : <>
                <Home />
                <div className={`${offcanvas === "true" ? "active-filter" : ""} offcanvas-filter`} onClick={closeOffcanvas}>
                </div>
                <div className={`${offcanvas === "true" ? "active-offcanvas" : ""} offcanvass`}>
                    <div className='container profile'>
                        <h4>Profil</h4>
                        <div className='edit-account'>
                            <div>
                                <div>
                                    {userEmail !== null && <>{userEmail[0]}</>}
                                </div>
                            </div>
                            <div>
                                {userEmail}
                            </div>
                            <div>
                                <a>Edit profile</a>
                                <a className='text-danger ' onClick={logOut}>Log out <i class="bi bi-box-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className='order-histroy' onClick={viewOrders}>
                            <i class="bi bi-stopwatch me-3"></i>  Order History
                        </div>

                        <div className={`${orders ? "active-orders" : ""} orders`}>
                            <div className='orders-card'>
                                <div>
                                    <h3>Orders #24342</h3> 
                                    <p>Tuesday, 2 Feb 2021</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>}

        </div>
    )
}
