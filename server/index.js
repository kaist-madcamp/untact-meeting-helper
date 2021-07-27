const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/user');
const postRouter = require('./src/routes/post')
const dbURL = 'mongodb://localhost:27017/meeting_helper'
const cors = require('cors')
// 익스프레스 객체 생성
var app = express();

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
//mongodb 연결 및 설정
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// port
const port = 80;

mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('DB Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', 80);

app.get('/', (req, res) => {
    res.status(418).send("Meeting Start");
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};


//router 연결
app.use(cors(corsOptions));
// app.use(cors());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/uploads', express.static('uploads'));
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
     origin: '*'
  }
});

// socketio 문법
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    socket.emit('diagram', { user: 'admin', word: 'word', posX: 'posX', posY: 'posY', color: 'color'});
    callback();
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('sendDiagram', (diagram, callback) => {
    const user = getUser(socket.id);
    socket.emit('diagram', diagram)
    io.to(user.room).emit('diagram', diagram)
  });

  
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`))