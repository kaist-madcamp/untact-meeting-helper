import PageTitle from './PageTitle';
import Header from './UI/Header';

interface Props {
  children: React.ReactNode;
  title: string;
  useAuthInput: [boolean, (token: string | undefined) => void];
}

export default function PageLayout({ children, title, useAuthInput }: Props) {
  return (
    <>
      <PageTitle title={title} />
      <Header useAuthInput={useAuthInput} />
      {children}
    </>
  );
}
