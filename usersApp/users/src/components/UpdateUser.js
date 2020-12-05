import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import UsersList from "./ListOfUsers";

export default function UpdateForm(props) {
    const [userInfo, setUserInfo] = useState([])
    const [formState, setFormState] = useState({
        name: "",
        bio: ""
    });
    const changeHandler = (e) => {
        e.persist()
        setFormState({...formState,
            [e.target.name]: e.target.value
        });
        
    };
    const params = useParams();
    const history = useHistory()
    function updateUser(updatedUser){
        for (let i = 0; i< props.users.length; i++){
            if(props.users[i].id === updatedUser.id){
               return  props.users[i] = updatedUser
            }
            
        }
    }
    const submit = (e) => {
        e.preventDefault();
        setFormState({
            name: "",
            bio: ""
        });
        axios.put(`http://localhost:8000/users/${params.id}`, formState)
        .then(res => {
            console.log(res);
            updateUser(res.data)
            history.push("/")
        })
        .catch(err => console.log(err))
        
    };
    useEffect(() => {
        axios.get(`http://localhost:8000/users/${params.id}`)
        .then(res => {
            console.log(res);
            setFormState(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [params.id])
    return (
        <form onSubmit={submit}>
            <label htmlFor="name">Full Name<span>*</span></label>
            <input placeholder="Your Name" name="name" type="text" onChange={changeHandler} value={formState.name} />

            <label htmlFor="bio">Tell Us About Yourself<span>*</span></label>
            <textarea name="bio" onChange={changeHandler} value={formState.bio} />
            
            <button>Update Now</button>
        </form>
    )
}