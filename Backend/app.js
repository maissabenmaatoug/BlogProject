const express = require('express');
const connectToDb = require('./config/connectToDb');
require("dotenv").config();
//connect to db
connectToDb();
//init app
const app = express();
//middlewares
//pour comprendre le json file venant du client
app.use(express.json());
//Routes

app.use("/api/auth/",require ("./Routes/authRoute"));
app.use("/api/users/",require("./Routes/usersRoute"));


//run the server

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));