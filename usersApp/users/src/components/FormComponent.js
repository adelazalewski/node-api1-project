import React, {useState} from "react";
import axios from "axios";

export default function Form(){
    const [newUser, setNewUser] = useState({
        name: "",
        bio: ""
    });
    const changeHandler = (e) => {
        setNewUser({[e.target.name]: e.target.value})
    };
    const submit = (e) => {
        e.preventDefault();
        setNewUser({
            name: "",
            bio: ""
        });
        axios.post("http://localhost:8000/users", newUser)
        .then(res => {
            console.log(res);
            setNewUser(res.data);
        })
        .catch(err => console.log(err))
    };
    return(
        <form onSubmit={submit}>
            <label htmlFor="name">Full Name<span>*</span>:</label>
            <input placeholder="Your Name" name="name" type="text" onChange={changeHandler} value={newUser.name} />

            <label htmlFor="bio">Tell Us About Yourself<span>*</span>:</label>
            <textarea name="bio" onChange={changeHandler} value={newUser.bio} />
            <button>Submit</button>
        </form>
    )
}