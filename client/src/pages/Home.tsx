import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes/index';
import PageLayout from '../components/PageLayout';

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
  return (
    <PageLayout title="home" useAuthInput={useAuthInput}>
      <h1>home page입니다.</h1>
    </PageLayout>
  );
}
