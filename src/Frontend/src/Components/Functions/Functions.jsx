import Reac, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Delay from '../Delay/Delay';
import Home from '../Home/Home';
import "./Functions.scss"
// import { GoogleTranslateElement } from 'react-google-translate';
export default function Functions() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [offcanvas, setOffcanvas] = useState(false)
    const [active, setActive] = useState("")
    const [orders, setOrders] = useState(false)


    function closeOffcanvas() {
        sessionStorage.setItem("shop", false)
        navigate("/")
    }
    function bootstrapBnt() {
        let cur = sessionStorage.getItem("funcsion")
        setOffcanvas(true)
        if (cur !== "") {
            setOffcanvas(cur)
        }
    }
    function activeLink(iteam) {
        setActive(iteam)
        setOrders(false)

    }
    function viewOrders() {

         setOrders(true)
    }
    useEffect(() => {
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
                    <div className='container funcsion'>
                        <h4>Functions</h4>
                        <div className='orders active-orders'>
                            <div onClick={() => activeLink("div1")} className={`${active === "div1" ? "activeLink" : ""} orders-row`}>
                                <div>
                                    <div><i className="bi bi-info-circle me-3"></i> Information</div>
                                </div>
                            </div>
                            <div onClick={() => activeLink("div2")} className={`${active === "div2" ? "activeLink" : ""} orders-row`}>
                                <div >
                                    <div><i className="bi bi-translate me-3"></i> Language</div>
                                </div>
                            </div>
                            <div onClick={() => { activeLink("div3"); viewOrders() }} className={`${active === "div3" ? "activeLink" : ""} orders-row `}>
                                <div className='d-flex align-items-center'  >
                                    <div><i class="bi bi-stopwatch me-3"></i>  Order History</div>
                                </div>
                            </div>
                        </div>
                        {active === "div2" && <div className={`${active === 'div2' ? "" : ""} language-info`}>
                                <div>
                                    English
                                </div>
                                <div>
                                    Русский
                                    {/* <GoogleTranslateElement /> */}
                                </div>
                            </div>}

                        {active === "div1" && <div className={`${active === "div1"  ? "contact-info-active" : ""} contact-info`}>
                            <div >
                                <i className="bi bi-telephone"></i>   <a href='tel:+998881422010'>+998 88 142 20 10</a>
                            </div>
                            <div>
                                <i className="bi bi-geo-alt"></i>   <a>Tashkent, str.Amir Temur15</a>
                            </div>
                            <div>
                                <i className="bi bi-instagram"></i>   <a href="https://www.instagram.com/umdovich/">umdovich</a>
                            </div>
                            <div>
                                <i className="bi bi-telegram"></i>   <a href="https://t.me/root0311">@rootccw</a>
                            </div>
                            <div>
                                <i href="https://t.me/root0311" className="bi bi-telegram"></i> <i href="https://www.instagram.com/umdovich/" className="bi bi-instagram"></i> <i  href='tel:+998881422010' className="bi bi-telephone"></i> <i className="bi bi-envelope"></i>
                            </div>
                        </div>}

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
