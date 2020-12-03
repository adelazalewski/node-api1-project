import React, {useEffect, useState} from "react";
import Card from "./UserCard";
import axios from "axios";

export default function UsersList(){
    const [users, setUsers] = useState([]);
useEffect(() => {
axios.get('http://localhost:8000')
.then(res => {
    console.log(res);
    setUsers(res.data)})
.catch(err => console.log(err))
}, []);
return (
<>
{users.length < 1 ? <h1>Fetching team memebers...</h1> : (
    users.map(user => <Card key={user.id} user={user} />)
)}
</>
)
}