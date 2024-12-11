const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use('/auth', authRoutes);
app.use('/user', dataRoutes);

app.get('/', (req, res) => {
    res.send("You are on the home page");
});

module.exports = app;
