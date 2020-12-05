import React, { useEffect, useState } from "react";
import Card from "./Card";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

export default function User(props){
    const [card, setCard] = useState(null)
    const history = useHistory();
    const params = useParams()
    const fetchUser =(id) => {
        axios.get(`http://localhost:8000/users/${id}`)
        .then(res => setCard(res.data))
        .catch(err => console.log(err))
    }
    
    
    const cardToUpdateForm = (e) => {
        history.push(`/update-user/${params.usersId}`)
    }
    const toMainPage = (e) => {
        history.push("/");
    }
    const deleteCall = (e) => {
        e.preventDefault();
        
        axios.delete(`http://localhost:8000/users/${params.usersId}`)
        .then(res => {
            console.log(res);
            props.setUsers(props.users.filter(u => u.id !== res.data.id));
            toMainPage(e)
        })
        .catch(err => console.log(err))
    
    }
    
    useEffect(()=> {
         fetchUser(params.usersId)

    }, [params.usersId]);
    if (!card) {
        return <div>Loading user information...</div>;
      }
    return(
        <>
            <Card user={card}/>
            
            <button onClick={(e) => cardToUpdateForm(e)}>Update Info</button>
            <button onClick={(e) => deleteCall(e)}>Delete User</button>
        </>
    )
}