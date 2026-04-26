const http=require("http");
const express = require('express');
const { Socket } = require("dgram");
const app = express();
const {Server}=require("socket.io");

const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const allOnlineUsers={};

function getRecieverSocketId(recieverId){
  return allOnlineUsers[recieverId];
}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId!== undefined){
        allOnlineUsers[userId]=socket.id;
    }

    io.emit("sent-all-online-users",Object.keys(allOnlineUsers));

    socket.on("disconnect",()=>{
        delete allOnlineUsers[userId];
        io.emit("sent-all-online-users", Object.keys(allOnlineUsers));
        
    })
})

module.exports={app,server,io,getRecieverSocketId};
