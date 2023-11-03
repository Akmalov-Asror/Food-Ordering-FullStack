import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.scss"
import BacdropImage from '../../Assets/Images/photo_2023-10-19_07-28-40.jpg'
import { NavLink } from 'react-router-dom'
import Delay from '../Delay/Delay'
import Data from '../../Utils/Data'
export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [emailValue, setEmailValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    // const allowedCharacters = /[0-9+]/;
    // function handleInput(e) {
        //     let inputPhoneNumber = e.target.value;
        // inputPhoneNumber = inputPhoneNumber.replace(/[^0-9]+/g, '');
        // // Format the phone number
        // let formattedPhoneNumber = '';
        // if (inputPhoneNumber.length > 0) {
        //   formattedPhoneNumber = `+${inputPhoneNumber.slice(0, 3)} (${inputPhoneNumber.slice(
        //     3,
        //     5
        //   )}) ${inputPhoneNumber.slice(5, 8)}-${inputPhoneNumber.slice(8, 10)}-${inputPhoneNumber.slice(10, 12)}`;
        // }
    // }
    // function handleKeyDown(e) {
    //     if (e.key === 'Backspace') {
    //         setPhonenNumber("")
    //         return;
    //     }
    // }
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
    async function postLoginData(evt) {
        evt.preventDefault()
        if (emailValue.includes("@gmail.com") || emailValue.includes("@mail.ru")) {
            let cur = {
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                role: 2,
            }
            await Data.PostRegister(cur)
            .then(response =>{
                localStorage.setItem("email", nameValue)
                navigate("/")
            })
        }
        
    }
    return (
        <div>
            {(!isLoading) ? <Delay /> : <>
                <img className='login-image' src={BacdropImage} alt="LoginImage" />
                <div>
                    <section>
                        <div className="form-box">
                            <div className="form-value">
                                <form onSubmit={postLoginData}>
                                    <h2>Register</h2>
                                    <div className="inputbox">
                                        <input required value={nameValue} onChange={(i) => setNameValue(i.target.value)} type="text" name="numberr" id="" />
                                        <label for="numberr">Full Name</label>
                                    </div>
                                    <div className="inputbox">
                                        <input onChange={(i) => setEmailValue(i.target.value)} value={emailValue} required type="email" name="email" id="" />
                                        <label for="email">Email</label>
                                    </div>
                                    <div className="inputbox">
                                        <input required onChange={(i) => setPasswordValue(i.target.value)} value={passwordValue} type="password" name="password" id="" />
                                        <label for="password">Password</label>
                                    </div>
                                    <div className="forget">
                                        <label>Forgot password? <a>New password</a></label>
                                    </div>
                                    <button type='submit'>Register</button>
                                    <div className="register">
                                        <p>No account? <NavLink to='/login' className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} a`}>Log in</NavLink></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </>}

        </div>
    )
}
