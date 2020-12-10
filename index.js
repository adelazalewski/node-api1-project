//initiate server
const express = require("express");
const db = require("./db")
const server = express();

//middleware here
server.use(express.json());

//create endpoints here
//the root of the api!!
server.get('/', (req, res) => {
    res.json({message: "Hello, welcome to Adela's FIRST API!! :)"});
});
//endpoints
server.get("/users", (req, res) => {
    const users = db.getUsers();
    res.json(users);
});
server.get("/users/:id", (req, res) =>{
    //the params var matches up to the name of the url param above
    const user = db.getUserById(req.params.id);
    if(!user){
        res.status(404).json({
            errorMessage: "The user information could not be retrieved."
        })
    }else if(user){
        const getUserById = db.getUserById(req.params.id);
        res.json(getUserById);
    }else{
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
    
})
server.post("/users", (req, res) => {
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }else if(req.body.name && req.body.bio){
        const newUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        });
        return res.status(201).json(newUser)
    }else{
        return res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
    
});
server.put("/users/:id", (req, res) => {
//check for user in db
const user = db.getUserById(req.params.id);
if(!user) {
    res.status(404).json({
        message: "user not found"
    })
}else if(user){
    const updated = db.updateUser(user.id, {
        //this function takes in id and data
        name: req.body.name || user.name,//if the name fied was not updated
        bio: req.body.bio || user.bio
    })
    res.json(updated);
}else if(!req.body.name || !req.body.bio){
    res.status(400).json({
        errorMessage: "Please provide name and bio for the user."
    })
}else{
    res.status(500).json({
        errorMessage: "The user information could not be modified."
    })
}
})
server.delete("/users/:id", (req, res) => {
    //check for user in db
    const user = db.getUserById(req.params.id);
    if(user) {
        const deleteUserById = db.deleteUser(user.id);
        res.json(user);
    }else if(!user){
        res.status(404).json({
            message: "user not found"
        })
    }else{
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
    
    
})

//start server
server.listen(8000, () => {
    console.log("server started at http://localhost:8000")
});