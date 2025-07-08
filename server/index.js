const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users'); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/quillora");

app.post('/users', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username, password })
    .then(user => {
        if (user) {
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    })
    .catch(err => res.status(500).json({ message: "No record exists", error: err }));
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
