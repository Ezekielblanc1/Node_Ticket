require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json())
const connectDB = require("./config/db");
const userRoutes = require("./routes/user")
const ticketRoute = require("./routes/ticket");
const ticketCategoryRoute = require("./routes/ticketcategory");
const roleRoute = require("./routes/roles")
app.use("/ticket", ticketRoute);
app.use("/user", userRoutes)
app.use("/category", ticketCategoryRoute);
app.use('/role', roleRoute)

connectDB();
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
