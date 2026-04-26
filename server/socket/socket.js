const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// MIDDLEWARE (must include your deployed frontend!)
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://rivora-two.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// HTTP server
const server = http.createServer(app);

// SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://rivora-two.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const allOnlineUsers = {};

function getRecieverSocketId(recieverId) {
  return allOnlineUsers[recieverId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    allOnlineUsers[userId] = socket.id;
  }

  io.emit("sent-all-online-users", Object.keys(allOnlineUsers));

  socket.on("disconnect", () => {
    delete allOnlineUsers[userId];
    io.emit("sent-all-online-users", Object.keys(allOnlineUsers));
  });
});

module.exports = { app, server, io, getRecieverSocketId };
