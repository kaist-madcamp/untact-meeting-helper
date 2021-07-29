import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Menu, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import PostImage from '../components/meeting/PostImage';
import LogInfo from '../components/meeting/LogInfo';
import { MeetingLogType } from '../components/meeting/types';
import Axios from '../lib/defaultClient';

function DetailMeetingLog(props: any) {
  const { logId } = props.match.params;
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
          props.history.push('/home');
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
    <div
      className="postPage"
      style={{ marginLeft: '270px', marginRight: '270px' }}
    >
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <PostImage log={meetingLog!} />
        </Col>
        <Col lg={1} xs={2} />
        <Col lg={11} xs={24}>
          <Dropdown overlay={menu}>
            <MoreOutlined style={{ float: 'right' }}>
              <DownOutlined />
            </MoreOutlined>
          </Dropdown>
          <LogInfo log={meetingLog!} />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(DetailMeetingLog);
