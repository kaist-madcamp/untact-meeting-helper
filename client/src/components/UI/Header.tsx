import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

interface Props {
  useAuthInput: [boolean, (token?: string | undefined) => void];
}

export default function Header({ useAuthInput }: Props) {
  return (
    <SHeader>
      <Navigation>
        <Link to={routes.home}>홈</Link>
        <Link to={routes.meetingRoom}></Link>
        <button onClick={() => useAuthInput[1]()}>Log out</button>
      </Navigation>
    </SHeader>
  );
}

const SHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 10px;
`;

const Navigation = styled.nav`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: center;
  a {
    margin: 0 10px;
  }
`;
