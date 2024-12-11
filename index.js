const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
        app.listen(process.env.PORT, () => {
            console.log(`Server Running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
