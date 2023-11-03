import React, {useEffect, useState} from 'react';
import "./Settings.scss"
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {toast, Toaster} from "alert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Settings = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [categoryActiveIndex , setCategoryActiveIndex] = useState(0);
    const [categories , setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [food , setFood] = useState(-1);
    const [addMode , setAddMode] = useState(false);
    const [categoryName , setCategoryName] = useState('');

    const onOpenModal = (mode , item) => {
        setAddMode(mode);
        setFood(item);
        setOpen(true);
    }

    const onCategoryModalOpen = () => {
        setCategoryModalOpen(true);
    }

    const onCloseModal = () => setOpen(false);

    const onCategoryModalClose = () => setCategoryModalOpen(false);

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
            const categoryResponse = await axios.get(url + 'Category' , config)
            setCategories(categoryResponse.data);
            console.log(categories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const toggleActive = (index) => {
        setActiveIndex(index);
    };

    const toggleCategoryActive = (index) => {
        setCategoryActiveIndex(index);
    };

    const handleFoodUpdate = (e) => {
        axios.put(url + 'Food/' + food.id, food, config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleInputChange = (field, e) => {
        if(field === 'count' || field === 'price'){
            if (/^\d*$/.test(e.target.value)) {

            }
            else {
                toast('Please enter only digits')
                return;
            }
        }
        setFood({
            ...food,
            [field]: e.target.value,
        });
        setFood((prevFood) => ({
            ...prevFood,
            description: 'string',
        }));
    };

    const handleCategoryName = (e) => {
        setCategoryName(e.target.value);
    }

    const addDish = async () => {
        try {
            console.log(food);
            await axios.post(url + "Food/CreateFoodByCategory?categoryId=" + categories[categoryActiveIndex].id, food , config)
                .then(response => {
                    console.log(response);
                })
        }catch (error){
            console.log(error);
        }
    }

    const addCategory = async () => {
        const data = {
            name: categoryName
        };
        await axios.post(url + 'Category' , data , config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteFood = async (id) => {
        try {
            axios.delete(url + 'Food/' + id , config)
                .then(response => {
                    console.log(response.data);
                    window.location.reload();
                })
        } catch (error){
            console.log(error)
        }
    }

    const submit = ( mode , id) => {
        if(mode){
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete this category?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteCategory(id)
                    },
                    {
                        label: 'No',
                        onClick: () => toast("Canceled!")
                    }
                ]
            });
        }
        else
        {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this food?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteFood(id)
                },
                {
                    label: 'No',
                    onClick: () => toast("Canceled!")
                }
            ]
        });
        }
    };

    const deleteCategory = async (index) => {
        try {
            await axios.delete(url + `Category?id=${categories[index].id}` , config)
                .then(response => {
                    console.log(response);
                })
                window.location.reload();
        }catch (error){
            console.log(error);
            toast("Please first delete foods")
        }
    }

    const settings = [
        {
            icon: 'fa-regular fa-heart',
            title: 'Appereance',
            description: 'Dark and Light mode, Font size',
        },
        {
            icon: 'fa-solid fa-store',
            title: 'Your Restaurant',
            description: 'Dark and Light mode, Font size',
        },
        {
            icon: 'fa-solid fa-percent',
            title: 'Products Management',
            description: 'Manage your product, pricing, etc',
        },
        {
            icon: 'fa-solid fa-list',
            title: 'Category Management',
            description: 'Manage your category',
        },
        {
            icon: 'fa-regular fa-bell',
            title: 'Notification',
            description: 'Customize your notifications',
        },
        {
            icon: 'fa-solid fa-lock',
            title: 'Security',
            description: 'Configure Password, PIN, etc',
        },
        {
            icon: 'fa-solid fa-lock',
            title: 'Security',
            description: 'Configure Password, PIN, etc',
        },
        {
            icon: 'fa-solid fa-circle-info',
            title: 'About Us',
            description: 'Find out more about Posly',
        }
    ];

    return (
        <div>
            <div>
                <Toaster />

                <Modal open={categoryModalOpen} onClose={onCategoryModalClose} center>
                    <form className="modal-form" onSubmit={addCategory}>
                        <div className="label-input">
                            <label>Category Name:</label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={handleCategoryName}
                            />
                        </div>
                        <button type="submit" className="sub-btn">Submit</button>
                    </form>
                </Modal>
                <Modal open={open} onClose={onCloseModal} center>
                    <form className="modal-form" onSubmit={(e) => {
                        if(addMode){
                            addDish();
                    }
                        else{
                            handleFoodUpdate(e);
                        }
                    }}>
                            <div>
                                <div className="label-input">
                                    <label>Image URL:</label>
                                    <input
                                        type="text"
                                        value={food && food.imageUrl ? food.imageUrl : ''}
                                        onChange={(e) => {
                                           handleInputChange('imageUrl', e)
                                        }}
                                    />
                                </div>
                                <div className="label-input">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={food && food.name ? food.name : ''}
                                        onChange={(e) => {
                                            handleInputChange('name', e)
                                        }}
                                    />
                                </div>
                                <div className="label-input">
                                    <label>Price:</label>
                                    <input
                                        type="text"
                                        value={food && food.price ? food.price : ''}
                                        onChange={(e) => {
                                            handleInputChange('price', e)
                                        }}
                                    />
                                </div>
                                <div className="label-input">
                                    <label>Count:</label>
                                    <input
                                        type="text"
                                        value={food && food.count ? food.count : ''}
                                        onChange={(e) => {
                                            handleInputChange('count', e)
                                        }}
                                    />
                                </div>
                            </div>
                        <button type="submit" className="sub-btn">Submit</button>
                    </form>
                </Modal>
            </div>
            <Header/>
            <div className="app-content">
                <Sidebar/>
                <div className="setting">
                    {settings.map((setting, index) => (
                        <div
                            className={`setting-item ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => toggleActive(index)}
                            key={index}
                        >
                            <i className={setting.icon}></i>
                            <div className="setting-info">
                                <p>{setting.title}</p>
                                <p>{setting.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="setting-content">
                    <>
                        {activeIndex === 2 ? (
                            <div>
                                <div className="setting-content-header">
                                    <h1 className="setting-content-title">Products Management</h1>
                                    <p onClick={onCategoryModalOpen}>Add Category</p>
                                </div>
                                <div className="content-categories">
                                    {
                                        categories?.map((category , index) => (
                                            <p className={`${index === categoryActiveIndex ? 'active' : ''}`}
                                               onClick={() => toggleCategoryActive(index)}
                                               key={index}
                                            >{category.name}
                                            </p>
                                        ))
                                    }
                                </div>
                                <div className="content-container">
                                    {categories && categories.length > 0 && (
                                        <div className='add-card' onClick={() => onOpenModal(true)}>
                                            <i className="fa-solid fa-plus"></i>
                                            <p>Add a new dish</p>
                                        </div>
                                    )}
                                    {
                                        categories?.map((category, index) => (
                                            categoryActiveIndex === index && (
                                                category.food?.map((food, foodIndex) => (
                                                    <div className='food-card' key={foodIndex}>
                                                        <div style={{backgroundImage: `url(${food.imageUrl})`}} className='card-img'></div>
                                                        <div className='card-title'>
                                                            <h5>{food.name}</h5>
                                                            <p>$ {food.price}</p>
                                                            <p>{food.count} Bowls</p>
                                                        </div>
                                                        <div className='card-buy'>
                                                            <button className="edit-btn" onClick={() => onOpenModal(false , food)}>
                                                                <i className="fa-regular fa-pen-to-square"></i> Edit dish
                                                            </button>
                                                            <button className="delete-btn" onClick={() => submit(false, food.id)}>
                                                                <i className="fa-regular fa-trash-can"></i> Delete dish
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                        ) :
                                activeIndex === 3 ?
                                    <div>
                                        <h1 className="category-management-title">Category Management</h1>
                                        <div className="category-context">
                                            {
                                                categories?.map((category , index) => (
                                                    <div className="category-container">
                                                        <p className="category"
                                                           onClick={() => toggleCategoryActive(index)}
                                                           key={index}
                                                        >{category.name}
                                                        </p>
                                                        <button onClick={()=> submit(true, index)}>Delete Category</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                :
                                (
                                    <div>
                                        <h1 style={{display:"flex", justifyContent:"center"}}>Nothing to show</h1>
                                    </div>
                                )
                            }
                    </>
                </div>
            </div>
        </div>
    );
};

export default Settings;