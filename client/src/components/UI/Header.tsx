import styled from 'styled-components';
import { routes } from '../../routes/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHouseUser } from '@fortawesome/free-solid-svg-icons';
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
        <Link to={routes.root}>
          <Title>Untact meeting helper</Title>
        </Link>
        {useAuthInput[0] ? (
          <div>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faHouseUser} />
            </Link>
            <Link to={routes.meetingRoom}>
              <FontAwesomeIcon icon={faHandshake} />
            </Link>
            <SButton onClick={() => useAuthInput[1]()}>Log out</SButton>
          </div>
        ) : (
          <div>
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
          </div>
        )}

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

const SHeader = styled.header`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid black;
`;

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  svg {
    margin: 0 20px;
    color: black;
  }
  a {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: black;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const SButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  padding: 5px;
  border: 0;
  height: 100%;
  cursor: pointer;
`;
