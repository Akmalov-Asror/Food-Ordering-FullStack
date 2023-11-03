import React, {useEffect, useState} from 'react';
import "./Admin.scss"
import moment from "moment";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Admin = () => {
    const currentDate = moment();
    const formattedDate = currentDate.format('MMMM, D');
    const [pendingCount , setPendingCount] = useState(0);
    const [progressCount , setProgressCount] = useState(0);
    const [todayCount, setTodayCount] = useState(0);
    const [allCount, setAllCount] = useState(0);
    const [todayOrders , setTodayOrders] = useState([]);
    const [orderTypeCounts, setOrderTypeCounts] = useState({
        'DineIn': 0,
        'ToGo': 0,
        'Delivery': 0,
    });

    const orderStatusMap = {
        0: 'Completed',
        1: 'Preparing',
        2: 'Pending',
    };
    const orderTypeMap = {
        0: 'DineIn',
        1: 'ToGo',
        2: 'Delivery',
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJJc21vaWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJpc21vaWxuaWdtYXRvdjk4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZTZiMTExNmMtYjZlZi00YWEyLWJiZjQtNmIyNTQwYmUyNjg3IiwiZXhwIjoxNjk4OTI3NzM3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNjkvIn0.Cxf3jkOyRTPXMxf-7UagCtAZR6YJPLJxmRaN_SCyLi8";
    const url = "https://localhost:1000/api/";
    const headers = {
        'Authorization': 'Bearer ' + token
    };
    const config = {
        headers: headers
    };

    const fetchData = async () => {
        try {
            const allResponse = await axios.get(url + "Order", config);

            const today = new Date();
            const todayStart = new Date(today);
            todayStart.setHours(0, 0, 0, 0);

            const filteredOrders = allResponse.data.filter(order => {
                const orderDate = new Date(order.createdTime);
                return orderDate >= todayStart && orderDate <= today;
            });

            const pendingCount = filteredOrders.filter(order => order.eStatus === 2).length;
            const progressCount = filteredOrders.filter(order => order.eStatus === 1).length;

            const counts = {
                'DineIn': 0,
                'ToGo': 0,
                'Delivery': 0,
            };

            filteredOrders.forEach(order => {
                const orderType = mapEnumToString(order.eOrderType);
                if (orderType in counts) {
                    counts[orderType]++;
                }
            });

            setOrderTypeCounts(counts);
            setTodayOrders(filteredOrders);
            setAllCount(allResponse.data.length);
            setTodayCount(filteredOrders.length);
            setProgressCount(progressCount);
            setPendingCount(pendingCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const mapEnumToString = (enumValue) => {
        switch (enumValue) {
            case 0:
                return 'DineIn';
            case 1:
                return 'ToGo';
            case 2:
                return 'Delivery';
            default:
                return 'Unknown';
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="app-container">
                <Header/>
                <div className="app-content">
                    <Sidebar/>
                    <div className="projects-section">
                        <div className="projects-section-header">
                            <p>Orders</p>
                            <p className="time">{formattedDate}</p>
                        </div>
                        <div className="projects-section-line">
                            <div className="projects-status">
                                <div className="item-status">
                                    <span className="status-number">{pendingCount}</span>
                                    <span className="status-type">Pending</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{progressCount}</span>
                                    <span className="status-type">In Progress</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{todayCount}</span>
                                    <span className="status-type">Today's Orders</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{allCount}</span>
                                    <span className="status-type">Total Orders</span>
                                </div>
                            </div>
                        </div>
                        <div className="project-boxes jsGridView">
                            {todayOrders?.map(order => {
                                let width = '0%'; // Default width

                                if (order.eStatus === 0) {
                                    width = '100%';
                                } else if (order.eStatus === 1) {
                                    width = '60%';
                                } else if (order.eStatus === 2) {
                                    width = '30%';
                                }

                                const style = {
                                    width: width,
                                    backgroundColor: '#ff942e',
                                };

                                const originalDate = new Date(order.createdTime); // Parse the date string
                                const formattedDate = originalDate.toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                });

                                const randomBackgroundColors = ['#e9e7fd', '#dbf6fd', '#ffd3e2', '#c8f7dc', '#d5deff', '#fee4cb'];
                                const randomColor = randomBackgroundColors[Math.floor(Math.random() * randomBackgroundColors.length)];

                                    return (
                                        <div className="project-box-wrapper">
                                            <div className="project-box" style={{backgroundColor: randomColor}}>
                                                <div className="project-box-header">
                                                    <span>{formattedDate}</span>
                                                </div>
                                                <div className="project-box-content-header">
                                                    <p className="box-content-header">id : {order.id}</p>
                                                    <p className="box-content-header">price : {order.price}</p>
                                                    <p className="box-content-header">orderType : {orderTypeMap[order.eOrderType]}</p>
                                                </div>
                                                <div className="box-progress-wrapper">
                                                    <p className="box-progress-header">{orderStatusMap[order.eStatus]}</p>
                                                    <div className="box-progress-bar">
                                                        <span className="box-progress" style={style}></span>
                                                    </div>
                                                    <p className="box-progress-percentage">{width}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div style={{width:'400px', display :'flex', flexDirection : 'column', alignItems: 'center' , justifyContent : 'space-between'}}>
                        <div className="messages-section" style={{height : '239px'}}>
                            <div className="projects-section-header">
                                <p>Most Ordered</p>
                                <p><i className="fa-solid fa-chevron-down"></i> Today</p>
                            </div>
                            <div className="messages">
                                <div className="most">
                                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/170504151239-bun-bo-nam-bo.jpg?q=w_1110,c_fill/f_webp" alt=""/>
                                    <div className="img-info">
                                        <p>Spicy seasoned seafood noodles</p>
                                        <p>200 dishes ordered</p>
                                    </div>
                                </div>
                                <div className="most">
                                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/170306134418-goi-cuon.jpg?q=w_1110,c_fill/f_webp" alt=""/>
                                    <div className="img-info">
                                        <p>Spicy seasoned seafood noodles</p>
                                        <p>200 dishes ordered</p>
                                    </div>
                                </div>
                                <div className="most">
                                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/170504151643-banh-knot.jpg?q=w_1110,c_fill/f_webp" alt=""/>
                                    <div className="img-info">
                                        <p>Spicy seasoned seafood noodles</p>
                                        <p>200 dishes ordered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft :'24px' , backgroundColor: 'white' , width : '400px' , height : '350px', borderRadius : '30px' , marginTop : '24px'}} >
                            <div className="statistics-content">
                                <h1 className="statistics-header">Most Type of Order</h1>
                                <p><i className="fa-solid fa-chevron-down"></i> Today</p>
                            </div>
                            <div className="statistics-diagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="188" height="188" viewBox="0 0 188 188" fill="none">
                                    <circle opacity="0.1" cx="94" cy="93.8788" r="88" fill="#1F1D2B" stroke="white" strokeWidth="11.4783"/>
                                    <circle opacity="0.05" cx="94.0002" cy="93.879" r="76.5217" fill="#1F1D2B" stroke="white" strokeWidth="11.4783"/>
                                    <circle opacity="0.1" cx="93.9998" cy="93.8785" r="65.0435" fill="#1F1D2B" stroke="white" strokeWidth="11.4783"/>
                                    <circle opacity="0.05" cx="94" cy="93.8788" r="53.5652" fill="#1F1D2B" stroke="white" strokeWidth="11.4783"/>
                                    <path d="M6 93.8788C6 142.48 45.3989 181.879 94 181.879C142.601 181.879 182 142.48 182 93.8788C182 45.2777 142.601 5.87878 94 5.87878" stroke="#65B0F6" strokeWidth="11.4783" strokeLinecap="round"/>
                                    <path d="M94 170.401C136.262 170.401 170.522 136.141 170.522 93.879C170.522 51.6172 136.262 17.3573 94 17.3573" stroke="#FFB572" strokeWidth="11.4783" strokeLinecap="round"/>
                                    <path d="M94.4391 28.2834C105.782 28.2834 116.927 31.2494 126.769 36.8871C136.611 42.5248 144.808 50.6381 150.546 60.422C156.283 70.2059 159.363 81.3203 159.479 92.662C159.595 104.004 156.743 115.179 151.206 125.078C145.67 134.977 137.64 143.256 127.916 149.094C118.191 154.932 107.109 158.125 95.7688 158.357C84.4288 158.589 73.2253 155.851 63.27 150.416C53.3148 144.98 44.9539 137.036 39.0171 127.372" stroke="#FF7CA3" strokeWidth="11.4783" strokeLinecap="round"/>
                                </svg>
                                <div className="diagram-info">
                                    <div>
                                        <div className="diagram-percentage">
                                            <div className="dinein"></div>
                                            <p>Dine In</p>
                                        </div>
                                        <p>{orderTypeCounts['DineIn']} customers</p>
                                    </div>
                                    <div>
                                        <div className="diagram-percentage">
                                            <div className="togo"></div>
                                            <p>To Go</p>
                                        </div>
                                        <p>{orderTypeCounts['ToGo']} customers</p>
                                    </div>
                                    <div>
                                        <div className="diagram-percentage">
                                            <div className="delivery"></div>
                                            <p>Delivery</p>
                                        </div>
                                        <p>{orderTypeCounts['Delivery']} customers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;