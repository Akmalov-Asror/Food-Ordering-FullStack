/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import './Home.scss'
import moment from 'moment';
import Delay from '../Delay/Delay';
import Card from './Card';
import Data from '../../Utils/Data';

export default function Home() {
    const [weatherArray, setWeatherArray] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(1);
    const [open, setOpen] = useState(false)
    const [selectVal, setSelectVal] = useState("choose")
    // Api
    const [categoriy, setCategoriy] = useState([])
    // Api

    // search
    const [ searchVal, setSearchVal] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const date = moment();
    const formated = date.format("dddd, D MMM YYYY")
    const handleItemClick = (index) => {
        setSelectedItem(index);
    };
    function valueSelect(value) {
        if (value !== undefined) {
            localStorage.setItem("sort", value)
            setSelectVal(value)
        }
        else {
            localStorage.setItem("sort", "")
            setSelectVal("choose")
        }
        setOpen(false)
    }
    
    useEffect(() => {
        
        let sorts = localStorage.getItem("sort")
        if (sorts?.length > 0) {
            setSelectVal(sorts)
        }
        else {
            setSelectVal("choose")
        }
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
    useEffect(() => {
        Data.GetWeather()
            .then(response => {
                setWeatherArray(response)
            })
    }, [])
    useEffect(() => {
        Data.GetCategoriy()
            .then(response => {
                setCategoriy(response)
            })
    }, [])
    useEffect(()=>{
        const cur = localStorage.getItem("email")
        setuserEmail(cur)
    },[userEmail])

    // useEffect(()=>{

    // },[searchVal])
    const Header = (
        <div>
            <header className='overflow-hidden'>
                <div>
                    <h2>Ташкент</h2>
                    <div className="weather">
                        <p>{formated}</p>
                        <div className="d-flex ">
                            <p>{Math.floor(weatherArray?.main?.temp - 273) + "°C"}</p>
                            <span className="mx-3 ">
                                {weatherArray?.weather?.length > 0 &&
                                    weatherArray?.weather?.map((item, index) => {
                                        return <span key={index}>{item?.description}</span>;
                                    })}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="search">
                        <i className="bi bi-search"></i>
                        <input onChange={(i) =>setSearchVal(i.target.value)} type="search" placeholder="Search for food, coffee, etc.." name="" id="" />
                    </div>
                </div>
            </header>
        </div>
    );
    const Categoriy = (
        <div>
            <div className='categoriy'>
                {categoriy?.length > 0 ? categoriy?.map((iteam, index) => {
                    return (
                        <div key={index}>
                            <p className={`categoriy-iteam ${selectedItem === iteam.id ? 'selected' : ''}`} onClick={() => handleItemClick(iteam.id)}>{iteam.name}</p>
                            <div className={`categoriy-iteam ${selectedItem === iteam.id ? 'selected-bottom' : ''}`}></div>
                        </div>
                    )
                }) : <></>}
            </div>
        </div>
    )

    const Select = (
        <div>
            <div className='select-row'>
                <div>
                    <h2>
                        Choose Dishes
                    </h2>
                </div>
                <div>
                    <div className='select' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {open ? <i className="bi bi-arrow-up-short"></i> : <i className="bi bi-arrow-down-short"></i>} <div>{selectVal}</div>
                        <ul className={`${open ? "open-select" : ""} dropdown-menu select-iteam`}>
                            <li><a className="dropdown-item text-ligth fw-bold" href="#" onClick={() => valueSelect("Count")}>Count</a></li>
                            <li><a className="dropdown-item text-ligth fw-bold" href="#" onClick={() => valueSelect("Price")}>Price</a></li>
                            <li><a className="dropdown-item text-ligth fw-bold" href="#" onClick={() => valueSelect("Name")} >name</a></li>
                            <li><a className="dropdown-item text-ligth fw-bold" onClick={() => valueSelect()} >Delete</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            {!isLoading ? <Delay /> : <>
                <div className='home-page'>
                    <div className='container'>
                        {Header}
                        {Categoriy}
                        {Select}
                        <Card search={searchVal} categoriyId={selectedItem} />
                    </div>
                </div>
            </>}

        </div>
    )
}
