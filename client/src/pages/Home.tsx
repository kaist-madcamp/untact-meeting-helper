import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes/index';
import PageLayout from '../components/PageLayout';
import socketIOClient from 'socket.io-client';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
  useEffect(() => {
    const socket = socketIOClient('localhost:80');
    socket.on('connect', () => {
      console.log('client connected!');
    });
  }, []);

  return (
    <PageLayout title="home" useAuthInput={useAuthInput}>
      <HomeContainer>home page입니다.</HomeContainer>
    </PageLayout>
  );
}

const HomeContainer = styled.div`
  height: 100vh;
`;
