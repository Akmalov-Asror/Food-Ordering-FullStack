import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Comments.scss"
import axios from "axios";

const Comment = () => {
    const [comments , setComments] = useState([]);
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
            const response = await axios.get(url + "Commit", config);
            setComments(response.data);
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Header/>
            <div className="app-content">
            <Sidebar/>
                <div className="message-context">
                    <h1>Client Comments</h1>
                    {
                        comments?.map(comment => {
                            return (
                                <div className="message">
                                    <div className="account">
                                        <span>{comment.user.userName.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p>{comment.user.userName}</p>
                                        <p>{comment.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Comment;