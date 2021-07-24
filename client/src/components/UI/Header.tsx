import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHouseUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Backdrop from './Backdrop';
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';

interface Props {
  useAuthInput: [boolean, (token?: string | undefined) => void];
}

export default function Header({ useAuthInput }: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authPageType, setAuthPageType] = useState('login');

  const toggleCloseHandler = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleAuthTypeHandler = () => {
    if (authPageType === 'login') {
      setAuthPageType('signup');
    } else if (authPageType === 'signup') {
      setAuthPageType('login');
    }
  };

  return (
    <SHeader>
      <Navigation>
        {useAuthInput[0] ? (
          <>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faHouseUser} />
            </Link>
            <Link to={routes.meetingRoom}>
              <FontAwesomeIcon icon={faHandshake} />
            </Link>
            <Link to={routes.uploadPost}>
              <FontAwesomeIcon icon={faUpload}/>
            </Link>
          </>
        ) : (
          <>
            <a>
              <FontAwesomeIcon
                onClick={() => setShowLoginModal(true)}
                icon={faHouseUser}
              />
            </a>
            <a>
              <FontAwesomeIcon
                onClick={() => setShowLoginModal(true)}
                icon={faHandshake}
              />
            </a>
          </>
        )}
        <button onClick={() => useAuthInput[1]()}>Log out</button>

        <Backdrop
          isClose={!showLoginModal}
          toggleCloseHandler={toggleCloseHandler}
        >
          {authPageType === 'login' ? (
            <Login
              toggleAuthTypeHandler={toggleAuthTypeHandler}
              useAuthInput={useAuthInput}
            />
          ) : (
            <SignUp toggleAuthTypeHandler={toggleAuthTypeHandler} />
          )}
        </Backdrop>
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
  svg {
    margin: 0 10px;
    color: black;
  }
  a {
    cursor: pointer;
  }
`;
