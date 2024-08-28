//for real time messaging, run in socket server not on express
import { Server } from "socket.io";
import http from "http";
import express from "express";
//npm i socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};
const users = {};
// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  //receiving user from frontend
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }
  // used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users));
  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});
export { app, io, server };