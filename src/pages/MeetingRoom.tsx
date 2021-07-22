import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { routes } from '../routes/index';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface Props {}

export default function MeetingRoom(props: Props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    const newTranscriptArr = transcript.split(' ');
    setTranscriptArr(newTranscriptArr);
  }, [transcript]);

  const toggleListening = useCallback(() => {
    if (recording) {
      SpeechRecognition.stopListening();
      setRecording(false);
    } else {
      SpeechRecognition.startListening({
        language: 'ko-KR',
        continuous: true,
      });
      setRecording(true);
    }
  }, [recording]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Browser doesn't support speech recognition.");
  }

  return (
    <>
      <Navigation>
        <h1>Meeting room 입니다.</h1>
        <Link to={routes.home}>Home</Link>
        <br />
        <Link to={routes.meetingRoom}>Meeting room</Link>
      </Navigation>

      <Canvas></Canvas>

      <TranscriptBox>{transcript}</TranscriptBox>

      <Button type="mic" onClick={toggleListening}>
        {' '}
        회의 시작
        <RecordingIndicator recording={recording} />
      </Button>
      <Button type="remove" onClick={resetTranscript}>
        {' '}
        Reset
      </Button>
    </>
  );
}

const Canvas = styled.div`
  height: 350px;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;
`;

const TranscriptBox = styled.div`
  height: 50px;
  width: 50%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: scroll;
`;

const RecordingIndicator = styled.span<{ recording: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.recording ? 'red' : '#ccc')};
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: 9px;
`;

const Navigation = styled.div``;
