import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

import './Chat.css';

const ENDPOINT = 'http://192.249.18.120:80/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [Diagram, setDiagram] = useState([]);
//   const [word, setword] = useState('');
//   const [posX, setposX] = useState('');
//   const [posY, setposY] = useState('');
//   const [color, setcolor] = useState();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
        console.log("onMessage", message)
      setMessages(messages => [ ...messages, message ]);
      console.log("Messages", messages)
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on('diagram', diagram => {
        console.log("Diagram", diagram)
      setDiagram(diagram);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    const diagram = {
      word: "js",
      posX: "100",
      posY: "100",
      color: "red"
    }
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
      socket.emit('sendDiagram', diagram, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;