const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

// MIDDLEWARE (must include your deployed frontend!)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps/Postman)
      if (!origin) return callback(null, true);

      // Allowed localhost
      if (origin.includes("localhost:5173")) return callback(null, true);

      // Allow any Vercel frontend
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      // Otherwise block
      return callback(new Error("CORS Not Allowed"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// HTTP server
const server = http.createServer(app);

// SOCKET SERVER
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.includes("localhost:5173")) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      return callback(new Error("Socket CORS Not Allowed"));
    },
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
