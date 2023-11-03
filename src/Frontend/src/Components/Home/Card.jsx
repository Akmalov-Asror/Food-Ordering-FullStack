import React, { useState, useRef, useEffect } from 'react';
import "./Card.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Data from '../../Utils/Data';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux'
import { getFoodsFromLocalStorage } from '../../Redux/UserFood';
const Card = (props, { type, color, className }) => {
    const switcher = useSelector(state => state.Foods.foodArray)
    const dispatch = useDispatch()
    const notify = () => toast.success('In addition, would you like more?');
    const [foods, setFoods] = useState([])
    const [animation, setAnimation] = useState(true)
    async function run() {
        let response = await Data.GetCategoriy()
        if (response !== undefined) {
            if (props.categoriyId !== undefined || props.categoriyId !== null || props.categoriyId !== 0) {
                setFoods(response[props?.categoriyId - 1].food)
            }
        }
        else {
            setFoods("")
        }
    }
    console.log(props);
    useEffect(() => {
        run()
    }, [props.categoriyId])
    useEffect(() => {
        const delay = 1000;
        var interval;
        if (foods?.length > 0 || foods !== undefined) {
            interval = setTimeout(() => {
                setAnimation(false)
            }, delay)
        }

        return () => {
            setAnimation(true)
            clearInterval(interval)
        }
    }, [foods])
    const filterFoods = foods.filter(i => {
        return i.name.toLowerCase().includes(props.search.toLowerCase())
    })
    console.log(filterFoods);
    function pushFoodArray(index) {
        const existingObject = switcher.find(obj => obj.id === index.id);

        if (existingObject) {
            const updatedObjects = switcher.map(obj => {
                if (obj.id === index.id) {
                    return { ...obj, count: obj.count + 1 };
                }
                return obj;
            });
            localStorage.setItem('FoodsArray', JSON.stringify(updatedObjects))
            dispatch(getFoodsFromLocalStorage())

        } else {
            const newFoodsArray = [...switcher, { ...index, count: 1 }]
            localStorage.setItem('FoodsArray', JSON.stringify(newFoodsArray))
            dispatch(getFoodsFromLocalStorage())
        }
    }

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                className="notificaton" />
            {animation ? <>
                <div id="loader-wrapper">
                    <div></div>
                </div>
            </>
                : <div className='card-row'>
                    {filterFoods?.length > 0 ? foods?.map((iteam, index) => {
                        return (
                            <div className='food-card'>
                                <div style={{ backgroundImage: `url(${iteam.imageUrl})` }} className='card-img'>
                                </div>
                                <div className='card-title'>
                                    <h5>{iteam.name}</h5>
                                    <p>$ 2.29</p>
                                    <p>{iteam.count} Bowls available</p>
                                </div>
                                <div className='card-buy'>
                                    <button onClick={() => { notify(); pushFoodArray(iteam) }}>Add</button>
                                </div>
                            </div>
                        )
                    }) : <div id="load">
                         Нет продуктов
                    </div>}
                </div>}

        </div>
    );
};

export default Card;