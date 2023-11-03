import React, { useState, useEffect, Profiler } from 'react'
import { useNavigate } from 'react-router-dom'
import Delay from '../Delay/Delay'
import BacdropImage from '../../Assets/Images/photo_2023-10-19_07-28-40.jpg'
import "./Login.scss"
import { NavLink } from "react-router-dom";
import Data from '../../Utils/Data'
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [emailValue, setEmailValue] = useState("")
  const [nameValue, setNameValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const postLoginData = async (evt) => {
    evt.preventDefault()
    if (emailValue.includes("@gmail.com") || emailValue.includes("@mail.ru")) {
      let cur = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        role: 2,
      }
      Data.PostLogin(cur)
        .then(response => {
          localStorage.setItem("email", nameValue)
          localStorage.setItem("token", response)
          navigate("/")
          // window.location.reload()
        })
    }
  }
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
      {(!isLoading)
        ?
        <Delay />
        :
        <>
          <img className='login-image' src={BacdropImage} alt="LoginImage" />
          <div>
            <section>
              <div className="form-box">
                <div className="form-value">
                  <form onSubmit={postLoginData}>
                    <h2>Login</h2>
                    <div className="inputbox">
                      <input onChange={(i) => setNameValue(i.target.value)} required type="text" name="name" id="" />
                      <label for="name">Full Name</label>
                    </div>
                    <div className="inputbox">
                      <input onChange={(i) => setEmailValue(i.target.value)} required type="email" name="email" id="" />
                      <label for="email">Email</label>
                    </div>
                    <div className="inputbox">
                      <input onChange={(i) => setPasswordValue(i.target.value)} required type="password" name="password" id="" />
                      <label for="password">Password</label>
                    </div>
                    <div className="forget">
                      <label>Forgot password? <NavLink to='/forgotpasswword' className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} a`} >New password</NavLink></label>
                    </div>
                    <button type='submit'>Log in</button>
                    <div className="register">
                      <p>No account? <NavLink to='/register' className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} a`}>Register</NavLink></p>
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
