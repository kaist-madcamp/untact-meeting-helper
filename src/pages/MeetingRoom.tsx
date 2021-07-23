import { useCallback, useEffect, useState, createRef} from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/Diagram/Diagram';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import PageTitle from '../components/PageTitle';
import WebCam from '../components/Webcam/WebCam';

interface Props {}

export default function MeetingRoom(props: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [screenFlag, setscreenFlag] = useState(false)

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

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Browser doesn't support speech recognition.");
  }

  const screenFun = () => {
    setscreenFlag(true);
  }

  return (
    <div>
        <Container>
          <PageTitle title={'Room'} />
          <Header label={'Meeting room'} />

          <Diagram transcriptArr={transcriptArr} screenFlag={screenFlag}/>

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
      <WebCam/>
    </div>
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
