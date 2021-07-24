import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../../providers/SocketProvider';

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  return (
    <Container>
      {stream && (
        //   Our own video
        <VideoContainer>
          <VideoTitle>{name || '대기방'}</VideoTitle>
          <SVideo playsInline muted ref={myVideo} autoPlay />
        </VideoContainer>
      )}
      {callAccepted && !callEnded && (
        // users video
        <VideoContainer>
          <VideoTitle>{call?.name || 'Name'}</VideoTitle>
          <SVideo playsInline ref={userVideo} autoPlay />
        </VideoContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const VideoTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

const VideoContainer = styled.div`
  padding: 0px;
  border: 2px solid black;
  margin: 5px;
`;

const SVideo = styled.video`
  width: 650px;
`;

export default VideoPlayer;
