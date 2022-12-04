require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
require("./storege/db")

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
app.use(express.json())
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)
app.get("/", (req, res) => {

    res.send("index")
})
app.listen(8080, () => {
    console.log("started")
})