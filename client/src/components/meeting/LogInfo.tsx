import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Avatar, Row, Col, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MeetingLogType } from './types';

interface Props {
  log: MeetingLogType;
}

export default function LogInfo({ log }: Props) {
  const [meetingLog, setMeetingLog] = useState<MeetingLogType>();

  useEffect(() => {
    setMeetingLog(log);
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Avatar size={32} icon={<UserOutlined />} />
        </Col>
        <Col lg={8}>
          <p style={{ fontSize: '15px', marginTop: '4px', marginLeft: '8px' }}>
            {meetingLog?.username}
          </p>
        </Col>
      </Row>
      <br />
      <Row>
        <span>
          <p style={{ fontSize: '15px', marginTop: '5px' }}>
            <b>{meetingLog?.title}</b>
          </p>
          <br />
          <p style={{ fontSize: '12px' }}>{meetingLog?.contents}</p>
        </span>
      </Row>
    </div>
  );
}
