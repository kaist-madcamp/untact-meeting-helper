import client from './client';

interface User {
  id: string;
  name: string;
  roomId: string;
}

const users: User[] = [];

export const addUser = ({ id, name, roomId }) => {
  if (!name || !roomId) return { error: 'Username and room are required.' };
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  // const existingUser = users.find(
  //   (user) => user.roomId === roomId && user.name === name,
  // );
  // if (existingUser) return { error: '이미 접속한 유저입니다.' };

  const user = { id, name, roomId };
  users.push(user);
  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id: string) => {
  console.log('users : ', users);
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.roomId === room);
