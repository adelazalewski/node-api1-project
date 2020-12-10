import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";


export default function UsersList(props){
    
return (
<div className="users-list">
<h2>Meet the team</h2>
{
    props.users.map(user => <Link key={user.id} to={`/users/${user.id}`} ><Card user={user}  /></Link> 
    )}
</div>
)
}