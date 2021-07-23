import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes/index';
import Header from '../components/UI/Header';
import { Container } from '../components/Container';
import PageTitle from '../components/PageTitle';

interface Props {}

export default function Home(props: Props) {
  return (
    <Container>
      <PageTitle title={'Home'} />
      <Header label={'Home 입니다.'} />
    </Container>
  );
}
