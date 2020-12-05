import React from "react";

export default function Card(props){
    return (
        <div className="user-card">
            <h1>{props.user.name}</h1>
            <p>{props.user.bio}</p>
        </div>
    )
}