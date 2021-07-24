import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from '../../providers/SocketProvider';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = () => {
  const [videoWidthRatio, setVideoWidthRatio] = useState('default');

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
    if (videoWidthRatio === 'default') {
      setVideoWidthRatio('up');
    } else {
      setVideoWidthRatio('default');
    }
  };

  const sizeDown = () => {
    if (videoWidthRatio === 'default') {
      setVideoWidthRatio('down');
    } else {
      setVideoWidthRatio('default');
    }
  };

  return (
    <Container>
      {stream && (
        //   Our own video
        <VideoContainer>
          <VideoTitle>
            {name || 'Waiting room'}
            <SButton className="plus" onClick={sizeUp}>
              <FontAwesomeIcon icon={faPlus} />
            </SButton>
            <SButton className="minus" onClick={sizeDown}>
              <FontAwesomeIcon icon={faMinus} />
            </SButton>
          </VideoTitle>
          <SVideo
            videoWidthRatio={videoWidthRatio}
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
            videoWidthRatio={videoWidthRatio}
            playsInline
            ref={userVideo}
            autoPlay
          />
        </VideoContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const VideoTitle = styled.div`
  background-color: #fff;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

const VideoContainer = styled.div`
  padding: 0px;
  border: 2px solid black;
  margin: 5px;
`;

const SVideo = styled.video<{ videoWidthRatio: string }>`
  width: ${(props) =>
    props.videoWidthRatio === 'default'
      ? '500px'
      : props.videoWidthRatio === 'up'
      ? '800px'
      : '300px'};
`;

const SButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: right;
  margin: 0 5px;
  cursor: pointer;
  &.minus {
    background-color: tomato;
  }
  &.plus {
    background-color: lightblue;
  }
`;

export default VideoPlayer;
