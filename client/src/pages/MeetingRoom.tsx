import { useCallback, useEffect, useState, createRef } from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/diagram/Diagram';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import PageTitle from '../components/PageTitle';
import WebCam from './WebCam';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Options from '../components/webcam/Options';
import Notifications from '../components/webcam/Notifications';

interface Props {
  useAuthInput: [boolean, (token: string | undefined) => void];
}

export default function MeetingRoom({ useAuthInput }: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [screenFlag, setscreenFlag] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser doesn't support speech recognition.");
    }
  }, []);

  // const canvasRef = useRef<LegacyRef<ReactDiagram>>(null);
  useEffect(() => {
    // console.log('transcript', transcript);
    const newTranscriptArr = transcript.split(' ');
    setTranscriptArr(newTranscriptArr);
    console.log('newTranscriptArr', newTranscriptArr);
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

  const screenFun = () => {
    setscreenFlag(true);
  };

  return (
    <>
      <Container>
        <PageTitle title={'Room'} />
        <Header useAuthInput={useAuthInput} />

        <Diagram transcriptArr={transcriptArr} screenFlag={screenFlag} />

        <Button type="mic" onClick={toggleListening}>
          {' '}
          회의 시작
          <RecordingIndicator recording={recording} />
        </Button>
        <Button type="remove" onClick={resetTranscript}>
          {' '}
          Reset
        </Button>
        <Button type="screenshot" onClick={screenFun}>
          {' '}
          Take screenshot
        </Button>
      </Container>

      <Container>
        <VideoPlayer />

        <Options>
          <Notifications />
        </Options>
      </Container>
    </>
  );
}

const RecordingIndicator = styled.span<{ recording: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.recording ? 'red' : '#ccc')};
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: 9px;
`;
