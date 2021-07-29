"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const users = [];
const addUser = ({ id, name, roomId }) => {
    if (!name || !roomId)
        return { error: 'Username and room are required.' };
    name = name.trim().toLowerCase();
    roomId = roomId.trim().toLowerCase();
    const user = { id, name, roomId };
    users.push(user);
    return { user };
};
exports.addUser = addUser;
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1)
        return users.splice(index, 1)[0];
};
exports.removeUser = removeUser;
const getUser = (id) => {
    console.log('users : ', users);
    return users.find((user) => user.id === id);
};
exports.getUser = getUser;
const getUsersInRoom = (room) => users.filter((user) => user.roomId === room);
exports.getUsersInRoom = getUsersInRoom;
//# sourceMappingURL=chat.js.map