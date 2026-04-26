const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 4000;

const authRoute = require("./routes/authRoutes");
const messageRoute = require("./routes/messageRoutes");
const dbConnect = require("./config/dbConnection");

const { app, server } = require("./socket/socket");

dbConnect();

// MIDDLEWARE HERE (NOT IN SOCKET ONLY)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rivora-two.vercel.app",
      "https://rivora-i3l42uhs3-harshaggarwal101s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// ROUTES
app.use("/api/v1", authRoute);
app.use("/api/v1", messageRoute);

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () => console.log(`Server running on port ${port}`));
