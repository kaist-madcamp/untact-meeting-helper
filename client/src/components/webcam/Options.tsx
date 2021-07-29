import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { SocketContext } from '../../providers/SocketProvider';

interface Props {
  children: React.ReactNode;
  // usernameInput: [string, React.Dispatch<React.SetStateAction<string>>];
  // usernameInput: [string, React.Dispatch<React.SetStateAction<string>>]
}

const Options = ({ children }: Props) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    roomId,
    setRoomId,
  } = useContext(SocketContext);
  // const [roomId, setRoomId] = useState('');

  return (
    <Container>
      <Row>
        <TextField
          label="Type User Name"
          value={name}
          onChange={(e) => setName!(e.target.value!)}
          fullWidth
        />

        <CopyToClipboard text={me!}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Assignment fontSize="large" />}
          >
            Copy room id
          </Button>
        </CopyToClipboard>
      </Row>
      <Row>
        <TextField
          label="Room ID to call"
          value={roomId}
          onChange={(e) => setRoomId!(e.target.value)}
          fullWidth
        />

        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PhoneDisabled fontSize="large" />}
            fullWidth
            onClick={leaveCall}
          >
            Leave a room
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Phone fontSize="small" />}
            fullWidth
            onClick={() => callUser!(roomId!)}
          >
            Call
          </Button>
        )}
      </Row>
      {children}
    </Container>
  );
};

const Row = styled.div``;

const Container = styled.div`
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  margin-top: 10px;
`;

export default Options;
