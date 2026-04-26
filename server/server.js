const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 4000;

const authRoute = require("./routes/authRoutes");
const messageRoute = require("./routes/messageRoutes");
const dbConnect = require("./config/dbConnection");

const { app, server } = require("./socket/socket");

dbConnect();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"], // for local testing
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/v1", authRoute);
app.use("/api/v1", messageRoute);

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () => console.log(`Server running on port ${port}`));
