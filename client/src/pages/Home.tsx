import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes/index';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';
import PageTitle from '../components/PageTitle';

interface Props {
  useAuthInput: [boolean, (token: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
  return (
    <Container>
      <PageTitle title={'Home'} />
      <Header useAuthInput={useAuthInput} />
    </Container>
  );
}
