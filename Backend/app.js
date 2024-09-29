const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db')
const {readdirSync} = require('fs')
  
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT; // Retrieve PORT from .env

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});


//routes
readdirSync('./routes').map((route) => {
    app.use('/api/v1', require('./routes/' + route));
});

const server = () => {
    db();        // Call the db function to connect to the database
    app.listen(PORT, () => {
        console.log("You are listening on port:", PORT);
    });
};

server();
