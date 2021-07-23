import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/Diagram/Diagram';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import PageTitle from '../components/PageTitle';

interface Props {}

export default function MeetingRoom(props: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const [ballArr, setBallArr] = useState<string[]>([]);

  const { transcript, resetTranscript } = useSpeechRecognition();

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
    <Container>
      <PageTitle title={'Room'} />
      <Header label={'Meeting room'} />

      <Diagram ballArr={ballArr} transcriptArr={transcriptArr} />

      <Button type="mic" onClick={toggleListening}>
        {' '}
        회의 시작
        <RecordingIndicator recording={recording} />
      </Button>
      <Button type="remove" onClick={resetTranscript}>
        {' '}
        Reset
      </Button>
    </Container>
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
