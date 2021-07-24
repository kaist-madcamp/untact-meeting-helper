import styled from 'styled-components';
import Notifications from '../components/webcam/Notifications';
import Options from '../components/webcam/Options';
import VideoPlayer from '../components/webcam/VideoPlayer';
import Header from '../components/UI/Header';

interface Props {
  useAuthInput: [boolean, (token: string | undefined) => void];
}


export default function WebCam({ useAuthInput }: Props) {
  return (
    <div>
      <Header useAuthInput={useAuthInput} />

      <Indicator>대기 상태입니다.</Indicator>
      <VideoPlayer />

      {/* <Options>
        <Notifications />
      </Options> */}
    </div>
  );
}

const Indicator = styled.div``;
