import styled from 'styled-components';
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../../providers/SocketProvider';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <Container>
      {call?.isReceivingCall && !callAccepted && (
        <Row>
          <Title>{call?.name} is calling:</Title>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </Row>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Title = styled.h1``;

export default Notifications;
