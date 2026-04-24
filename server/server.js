const express = require('express')
const app = express()
const cors=require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;
const authRoute = require("./routes/authRoutes");
const messageRoute = require("./routes/messageRoutes");
const dbConnect = require("./config/dbConnection");
dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api/v1",authRoute);
app.use("/api/v1",messageRoute)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));