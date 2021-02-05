require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const ticketRoute = require("./routes/ticket");

app.use("/", ticketRoute);

connectDB();
const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
