import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../providers/SocketProvider';
import Draggable from 'react-draggable';

const VideoPlayer = () => {
  const [videoWidth, setvideoWidth] = useState('500px');

  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  const sizeUp = () => {
    setvideoWidth('800px');
  };

  const sizeDown = () => {
    setvideoWidth('300px');
  };

  return (
    <Draggable>
      <Container>
        {stream && (
          //   Our own video
          <VideoContainer>
            <VideoTitle>
              {name || '대기방'}
              <button onClick={sizeDown}>-</button>
              <button onClick={sizeUp}>+</button>
            </VideoTitle>
            <SVideo
              dynamicWidth={videoWidth}
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          </VideoContainer>
        )}
        {callAccepted && !callEnded && (
          // users video
          <VideoContainer>
            <VideoTitle>{call?.name || 'Name'}</VideoTitle>
            <SVideo
              dynamicWidth={videoWidth}
              playsInline
              ref={userVideo}
              autoPlay
            />
          </VideoContainer>
        )}
      </Container>
    </Draggable>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const VideoTitle = styled.div`
  background-color: #fff;
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

const SVideo = styled.video<{ dynamicWidth: string }>`
  width: ${(props) => props.dynamicWidth || '650px'};
`;

export default VideoPlayer;
