import { useCallback, useEffect, useState, createRef, useContext } from 'react';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import Diagram from '../components/diagram/Diagram';
import Header from '../components/UI/Header';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import PageTitle from '../components/PageTitle';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Options from '../components/webcam/Options';
import Notifications from '../components/webcam/Notifications';
import PageLayout from '../components/PageLayout';
import Draggable from 'react-draggable';
import Modal from '../components/UI/Modal';
import {
  ChatContainer,
  ChatMainBox,
  ChatBox,
  ChatBlock,
} from '../components/chat/ChatContainer';
import {
  ChatControlBox,
  ChatController,
} from '../components/chat/ChatController';
import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../lib/constant';
import {
  ChatForm,
  ChatFormButton,
  ChatFormTextarea,
} from '../components/chat/ChatForm';
import { SocketContext } from '../providers/SocketProvider';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

const socket = io(SOCKET_ENDPOINT);

export default function MeetingRoom({ useAuthInput }: Props) {
  const [transcriptArr, setTranscriptArr] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [faceContainerWidth, setFaceContainerWidth] = useState('default');
  const [keystroke, setKeystroke] = useState('');
  const [attendingUser, setAttendingUser] = useState('');
  const [chatArray, setChatArray] = useState<
    {
      username: string;
      message: string;
    }[]
  >([]);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const { roomId, name: myUsername, callAccepted, callEnded } = useContext(
    SocketContext,
  );

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Browser doesn't support speech recognition.");
    }

    socket.on('attending-user', ({ text }) => {
      console.log('attending user : ', text);
      setAttendingUser(text);
    });

    socket.on('receive-message', ({ username, message }) => {
      console.log('username : ', username);
      console.log('message : ', message);
      setChatArray((prev) => [...prev, { username, message }]);
    });
  }, []);

  useEffect(() => {
    const container = document.getElementById('chat-main-box');
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [chatArray]);

  useEffect(() => {
    // 통화 받았을 때, 채팅 시작.
    if (callAccepted && !callEnded) {
      console.log('my name : ', myUsername);
      console.log('room Id : ', roomId);
      if (!myUsername || !roomId) return;
      socket.emit(
        'join-meeting',
        { name: myUsername, roomId },
        (error: string) => {
          alert(error);
        },
      );
    }
  }, [callAccepted, callEnded]);

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

  const sizeUp = () => {
    if (faceContainerWidth === 'default') {
      setFaceContainerWidth('up');
    } else {
      setFaceContainerWidth('default');
    }
  };

  const sizeDown = () => {
    if (faceContainerWidth === 'default') {
      setFaceContainerWidth('down');
    } else {
      setFaceContainerWidth('default');
    }
  };

  const chatClickHandler = () => {
    setShowChatBox(!showChatBox);
  };

  const sendMessageHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (keystroke.length === 0) return;
    console.log('submit!');
    // socket emit
    socket.emit('send-message', keystroke);
    setChatArray((prev) => [
      ...prev,
      { username: myUsername!, message: keystroke },
    ]);
    setKeystroke('');
  };

  const msgChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.includes('\n')) {
      sendMessageHandler();
      return;
    }
    setKeystroke(e.target.value);
  };

  return (
    <PageLayout title="Room" useAuthInput={useAuthInput}>
      <Container>
        <DiagramContainer>
          <Diagram transcriptArr={transcriptArr} />

          <ControlBox>
            <Button type="mic" onClick={toggleListening}>
              STT Start
              <RecordingIndicator recording={recording} />
            </Button>
            <Button type="remove" onClick={resetTranscript}>
              Reset
            </Button>
            <Button type="chat" onClick={chatClickHandler}>
              Chatting
            </Button>
          </ControlBox>
        </DiagramContainer>

        <Draggable>
          <FaceContainer faceContainerWidth={faceContainerWidth}>
            <VideoPlayer
              widthController={[faceContainerWidth, sizeUp, sizeDown]}
            />
            {faceContainerWidth !== 'down' ? (
              <Options>
                <Notifications />
              </Options>
            ) : null}
          </FaceContainer>
        </Draggable>

        {showChatBox && (
          <Modal>
            <Draggable>
              <ChatContainer>
                <ChatControlBox>
                  <ChatController
                    onClick={() => setShowChatBox(false)}
                    className="close"
                  >
                    x
                  </ChatController>
                </ChatControlBox>
                <ChatMainBox id="chat-main-box">
                  <AttendingNotification>{attendingUser}</AttendingNotification>
                  {chatArray.map((chat, idx) => (
                    <ChatBlock
                      key={idx}
                      location={chat.username === myUsername ? 'right' : 'left'}
                    >
                      <ChatBox
                        className={
                          chat.username === myUsername
                            ? 'send_box'
                            : 'receive_box'
                        }
                      >
                        {chat.message}
                      </ChatBox>
                    </ChatBlock>
                  ))}
                </ChatMainBox>
                <ChatForm
                  method="post"
                  name="SendMessageForm"
                  onSubmit={sendMessageHandler}
                >
                  <ChatFormTextarea
                    name="messageTextArea"
                    onChange={msgChangeHandler}
                    value={keystroke}
                    maxLength={60}
                    rows={5}
                  />
                  <ChatFormButton type="submit">전송</ChatFormButton>
                </ChatForm>
              </ChatContainer>
            </Draggable>
          </Modal>
        )}
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const DiagramContainer = styled.div`
  width: 100%;
`;

const ControlBox = styled.div``;

const AttendingNotification = styled.p`
  text-align: center;
  font-size: 10px;
`;

export const FaceContainer = styled.div<{ faceContainerWidth: string }>`
  position: absolute;
  right: 30px;
  z-index: 888;
  width: ${(props) => {
    if (window.location.pathname === '/') {
      return props.faceContainerWidth === 'default'
        ? '500px'
        : props.faceContainerWidth === 'up'
        ? '800px'
        : '300px';
    } else if (window.location.pathname === '/meeting-room') {
      return props.faceContainerWidth === 'default'
        ? '300px'
        : props.faceContainerWidth === 'up'
        ? '400px'
        : '0px';
    }
  }};
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
