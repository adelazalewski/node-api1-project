import React from "react";

export default function Card(props){
    return(
        <div className="user-card">
            <h1>{props.name}</h1>
            <p>About: {props.bio}</p>
        </div>
    )
}