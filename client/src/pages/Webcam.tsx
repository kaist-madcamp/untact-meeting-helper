import styled from 'styled-components';
import Notifications from '../components/webcam/Notifications';
import Options from '../components/webcam/Options';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';

interface Props {
  useAuthInput: [boolean, (token: string | undefined) => void];
}

export default function WebCam({ useAuthInput }: Props) {
  return (
    <Container>
      <Header useAuthInput={useAuthInput} />
      <VideoPlayer />

      {/* <Options>
        <Notifications />
      </Options> */}
    </Container>
  );
}

const Indicator = styled.div``;
