// const express=require('express');
// const userRoute=require('./routes/routes');
// const app=express();
// const port=8080;
// const rooms=['general','Discussion','Meeting'];
// const cors=require('cors');
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors());

// const server=require('http').createServer(app);
// const io=require('socket.io')(server,{
//     cors:{
//         origin:'http://localhost:3000',
//         methods:['GET','POST']
//     }
// })

// require('./config/conn')
// const path=require('path');

// require('dotenv').config({
//     path:path.join(__dirname,'.env')
// })
// app.use('/',userRoute);
// console.log(process.env.DBPORT);
// app.listen(port,()=>{
//     console.log(`app is listening to http://localhost:${port}`)
// })

// const express=require('express');
// const app=express();
// const userRoute=require('./routes/Userroute');
// const User=require('./models/User')
// const rooms=['general','Discussion','Meeting'];
// const cors=require('cors');
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors());

// app.use('/users',userRoute)
// require('./Connection');

// const server=require('http').createServer(app);
// const PORT=8080;
// const io=require('socket.io')(server,{
//     cors:{
//                  origin:'http://localhost:8080',
//                  methods:['GET','POST']
//             }
// })
// app.get('/',(req,res)=>{
//     res.send("hello backend is running ...")
// })
// server.listen(PORT,()=>{
//     console.log(`app is listening to http://localhost:${PORT}`)
// })

const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/Data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const userRoutes = require("./newroutes/userRoutes");
const chatRoutes = require("./newroutes/chatRoutes.js");
const connectDB = require("./Connection");
const messageRoutes = require("./newroutes/messageRoutes");
dotenv.config();
connectDB();
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Api is running");
});
// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// })

app.use(express.json());
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  port,
  console.log(`server started at port http://localhost:${port}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("Connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined Room :" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
