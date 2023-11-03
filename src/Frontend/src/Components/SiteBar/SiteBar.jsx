import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Delay from '../Delay/Delay';
import "./Sitebar.scss"
import { useSelector } from 'react-redux/es/hooks/useSelector';
export default function SiteBar() {

  const  selector = useSelector(store => store.Foods.foodArray)
  const [foodLength, setFoodLength] = useState()
  const navigate = useNavigate();
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [activeLink, setactiveLink] = useState(false)
  const [ userEmail, setUserEmail] = useState("")
  const [sitebar, setSitebar] = useState([
    {
      icon: "bi bi-list",
      id: 1,
      path: "/history",
      profile_paht: "/funcsion"
    },
    {
      icon: "bi bi-house",
      id: 2,
      path: "/",
      profile_paht: "/"
    },

    {
      icon: "bi bi-gear",
      id: 3,
      path: "/setting",
      profile_paht: "/setting"
    },

    {
      icon: "bi bi-pie-chart",
      id: 4,
      path: "/piechard",
      profile_paht: "/piechard"
    },

    {
      icon: "bi bi-chat-square",
      id: 5,
      path: "/chat",
      profile_paht: "/chat"
    },

    {
      icon: "bi bi-cart3",
      id: 6,
      path: "/shop",
      profile_paht: "/shop",
      foods: true
    },

    {
      icon: "bi bi-person",
      id: 7,
      path: "/login",
      profile_paht: "/myaccount"
    },

  ])
  const [sitebarMob, setSitebarMob] = useState([
    {
      icon: "bi bi-list",
      id: 1,
      path: "/history",
      profile_paht: "/funcsion"
    },
    {
      icon: "bi bi-pie-chart",
      id: 2,
      path: "/piechard",
      profile_paht: "/piechard"

      
    },
    {
      icon: "bi bi-house",
      id: 3,
      path: "/",
      profile_paht: "/"
    },
    {
      icon: "bi bi-cart3",
      id: 6,
      path: "/shop",
      profile_paht: "/shop",
      foods: true

    },
    {
      icon: "bi bi-person",
      id: 7,
      path: "/login",
      profile_paht: "/myaccount"
    },
  ])
  function delay(evt, iteam) {
    setactiveLink(true)
    if(evt === '/shop'){
      sessionStorage.setItem("shop" , true)
    }
    else  if(iteam === "/myaccount") {
      sessionStorage.setItem("account", true)
    }
    else if(iteam === "/funcsion"){
      sessionStorage.setItem("funcsion", true)
    }
  }

  useEffect(()=>{
    setIsLoading(false)
    const delay = 1000;
    <Delay />
    const redirectTimeout = setTimeout(() => {
      setIsLoading(true)
    }, delay);

    return () => {
      clearTimeout(redirectTimeout);
    };
  },[])
  useEffect(()=>{
    const email = localStorage.getItem("email")
    if( email !== null ){
      console.log(email);
        setUserEmail(email)
    }
  },[localStorage.getItem("email")])
  useEffect(()=>{
    setFoodLength(selector)
  },[selector])
  return (
    <div>
      {!isLoading ? <Delay /> : <div className='row siteBar Decktop'>
        {
          sitebar?.map((iteam, index) => {
            const isActive2 = location.pathname === iteam.path;
            return (
              <div key={index} className={`col-2 col-sm-12 ${isActive2 ? 'active-link' : ''}`}>
                <div>
                  <NavLink to={`${ userEmail === null || userEmail?.length === 0  ? iteam.path  : iteam.profile_paht }`} onClick={()=>{delay(iteam.path, iteam.profile_paht)}} className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? `active` : ``} `}>
                    <i className={iteam.icon}></i>
                    {iteam.foods && <span className='foods-length'>{selector?.length}</span>}
                  </NavLink>
                </div>
              </div>
            )
          })
        }
      </div>}

      {!isLoading ? <Delay /> : <div className='siteBar Modile'>
        {
          sitebarMob?.map((iteam, index) => {
            const isActive2 = location.pathname === iteam.path;
            return (
              <div key={index}  className={`siteBarCard ${isActive2 ? 'active-link' : ''}`}>
                <div>
                  <NavLink to={`${ userEmail === null || userEmail?.length === 0  ? iteam.path  : iteam.profile_paht }`} onClick={()=>{delay(iteam.path, iteam.profile_paht)}} className={`${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "text-white link"} `}>
                    <i className={iteam.icon}></i>
                    {iteam.foods && <span className='foods-length'>{selector?.length}</span>}

                  </NavLink>
                </div>
              </div>
            )
          })
        }
      </div>}


    </div>
  )
}
