import styled from 'styled-components';
import Notifications from '../components/webcam/Notifications';
import Options from '../components/webcam/Options';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Header from '../components/UI/Header';
import Draggable from 'react-draggable';
import PageLayout from '../components/PageLayout';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function WaitingRoom({ useAuthInput }: Props) {
  return (
    <PageLayout title={'waiting room'} useAuthInput={useAuthInput}>
      <Draggable>
        <FaceContainer>
          <VideoPlayer />
          {useAuthInput[0] ? (
            <Options>
              <Notifications />
            </Options>
          ) : (
            <LoginIndicator>Join Our Meeting Assistant!</LoginIndicator>
          )}
        </FaceContainer>
      </Draggable>
    </PageLayout>
  );
}

const LoginIndicator = styled.div`
  border: 2px solid black;
  margin-top: 10px;
  width: 500px;
  padding: 30px 0;
  font-size: 24px;
  text-align: center;
`;

const FaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
`;
