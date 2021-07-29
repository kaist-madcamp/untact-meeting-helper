require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { addUser, getUser, getUsersInRoom, removeUser } from './chat';
import socketIO from 'socket.io';

const app: express.Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use('/', routes);
app.get('/', (_, res: Response) => {
  res.send('Hello, Developers!');
});

export const server = http.createServer(app);

const io = new socketIO.Server(server, {
  cors: {
    origin: '*',
  },
});

const chatIo = io.of('/meeting');

chatIo.on('connect', (socket: socketIO.Socket) => {
  console.log('connected ', socket.id);
  socket.on('join-meeting', ({ name, roomId }, callback) => {
    if (!name || !roomId) return;

    const { user, error } = addUser({ id: socket.id, name, roomId });
    if (error) return callback(error);

    socket.join(user.roomId);

    socket.to(user.roomId).emit('attending-user', {
      text: `${user.name}님이 참석했습니다.`,
    });
  });

  socket.on('send-message', (message) => {
    const user = getUser(socket.id);
    if (!user) return;

    socket.broadcast
      .to(user.roomId)
      .emit('receive-message', { username: user.name, message });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      socket.to(user.roomId).emit('message', {
        user: user.name,
        text: `${user.name} has left.`,
      });
      socket.to(user.roomId).emit('roomData', {
        users: getUsersInRoom(user.roomId),
        roomId: user.roomId,
      });
    }
  });

  socket.on('send-diagram', (diagram) => {
    console.log('send-diagram socket.id', socket.id);
    const user = getUser(socket.id);
    console.log(user);
    if (!user) return;
    socket.emit('receive-diagram', diagram);
    socket.broadcast.to(user.roomId).emit('receive-diagram', diagram);
  });
});

server.listen(80, () => {
  console.log('✅ Server is listening on port 80');
});