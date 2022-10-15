// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const api = require("./routes/routes");

// Configure .env
require("dotenv").config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, console.log("Connected to db"));
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/", api);

// Listener
app.listen(PORT, () => {
    console.log(`Server Started: http://localhost:${PORT}`);
});
