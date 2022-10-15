// Imports
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./routes/routes");

// Configure .env
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/", api);

// Listener
app.listen(PORT, () => {
    console.log(`Server Started: http://localhost:${PORT}`);
});
