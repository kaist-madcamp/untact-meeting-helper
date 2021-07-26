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


import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Notifications from '../components/WebCam/Notifications';
import Options from '../components/WebCam/Options';
import VideoPlayer from '../components/WebCam/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 25, //15
    margin: '30px 100px', //30, 100
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px', //600
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  
  rightallign: {
    // justifyContent: 'right',
    // alignItems: 'right',
    marginLeft: 'auto'
  },

  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '300px',
  },
}));

interface Props {}

export default function MeetingRoom(props: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [screenFlag, setscreenFlag] = useState(false);
  const classes = useStyles();

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
      <PageTitle title={'Room'} />
      <Header label={'Meeting room'} />

      <div className={classes.gridContainer}>
        <div>
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
        </div>

        <div>
            <div className={classes.wrapper}>
              <div className = {classes.rightallign}>
                <VideoPlayer />
                <Options>
                  <Notifications />
                </Options>
              </div>
            </div>
        </div>
      </div>
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
