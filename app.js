"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const chat_1 = require("./chat");
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use('/uploads', express_1.default.static('uploads'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/', routes_1.default);
app.get('/', (_, res) => {
    res.send('Hello, Developers!');
});
exports.server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(exports.server, {
    cors: {
        origin: '*',
    },
});
const chatIo = io.of('/meeting');
chatIo.on('connect', (socket) => {
    console.log('connected ', socket.id);
    socket.on('join-meeting', ({ name, roomId }, callback) => {
        if (!name || !roomId)
            return;
        const { user, error } = chat_1.addUser({ id: socket.id, name, roomId });
        if (error)
            return callback(error);
        socket.join(user.roomId);
        socket.to(user.roomId).emit('notification-user', {
            text: `${user.name}님이 참석했습니다.`,
        });
    });
    socket.on('send-message', (message) => {
        const user = chat_1.getUser(socket.id);
        if (!user)
            return;
        socket.broadcast
            .to(user.roomId)
            .emit('receive-message', { username: user.name, message });
    });
    socket.on('disconnect', () => {
        console.log('server disconnect');
        const user = chat_1.removeUser(socket.id);
        if (user) {
            socket.to(user.roomId).emit('notification-user', {
                text: `${user.name}이 방을 나갔습니다.`,
            });
        }
    });
    socket.on('send-diagram', (diagram) => {
        console.log('send-diagram socket.id', socket.id);
        const user = chat_1.getUser(socket.id);
        console.log(user);
        if (!user)
            return;
        socket.emit('receive-diagram', diagram);
        socket.broadcast.to(user.roomId).emit('receive-diagram', diagram);
    });
});
exports.server.listen(80, () => {
    console.log('✅ Server is listening on port 80');
});
//# sourceMappingURL=app.js.map