import React, {useState, useEffect} from "react";
import Form from "./components/FormComponent";
import UsersList from "./components/ListOfUsers";
import User from "./components/UserCard";
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import UpdateForm from "./components/UpdateUser";

function App() {
  const [users, setUsers] = useState([]);
useEffect(() => {
axios.get('http://localhost:8000/users')
.then(res => {
    console.log(res);
    setUsers(res.data)})
.catch(err => console.log(err))
}, []);
const addUser = (newUser) => {
  setUsers([...users, newUser])
};


  return (
    <Router>
      <Route path="/update-user/:id" render={(props) => <UpdateForm {...props} setUsers={setUsers} users={users}  />} />

      <Route path="/users/:usersId" render={(props) => <User {...props} setUsers={setUsers} users={users} /> }/>
      
      <Route exact path="/">
      <div className="App">
      <header className="App-header">
        <h1>New User Form</h1>
        <Form addUser={addUser} />
        <UsersList users={users}  />
      </header>
    </div>
      </Route>
    </Router>
    
  );
}

export default App;
