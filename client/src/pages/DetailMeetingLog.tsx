import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Menu, Dropdown } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import PostImage from '../components/meeting/PostImage';
import LogInfo from '../components/meeting/LogInfo';
import { MeetingLogType } from '../components/meeting/types';
import Axios from '../lib/defaultClient';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';

interface Props extends RouteComponentProps<any> {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

function DetailMeetingLog({ useAuthInput, match, history }: Props) {
  const { logId } = match.params;
  const [meetingLog, setMeetingLog] = useState<MeetingLogType>();
  // const [VisibleBtn, setVisibleBtn] = useState(true);

  const fetchDetailLog = async () => {
    const res = await Axios.get(`/post/${logId}`);
    console.log(res);
    if (res.data.ok) {
      setMeetingLog(res.data.post);
    } else {
      alert(res.data.error);
    }
  };

  useEffect(() => {
    fetchDetailLog();
  }, []);

  const deletePost = (e: any) => {
    if (window.confirm('Really Delete?') == true) {
      Axios.delete('/post/delete', {
        data: { postId: logId },
        withCredentials: true,
      }).then((response) => {
        if (response.data.ok) {
          alert('Succesfully Delete');
          history.push('/home');
        } else {
          alert('Failed to save Comment');
        }
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={deletePost}>Delete</a>
      </Menu.Item>
    </Menu>
  );

  console.log(meetingLog);

  return (
    <PageLayout title="detail-log" useAuthInput={useAuthInput}>
      <Container>
        <PostImage log={meetingLog!} />
        <LogInfo log={meetingLog!} />
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px 150px 200px;
`;

export default withRouter(DetailMeetingLog);
