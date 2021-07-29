import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Avatar, Row, Col, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MeetingLogType } from './types';
import styled from 'styled-components';
import Axios from '../../lib/defaultClient';

interface Props {
  log: MeetingLogType;
}

export default function LogInfo({ log }: Props) {
  const deleteBtnHandler = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return null;
    const res = await Axios.delete(`/post/${log.id}`);
    console.log(res);
    if (res.data.ok) {
      window.location.reload();
    } else {
      alert(res.data.error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Avatar size={32} icon={<UserOutlined />} />
        </Col>
        <Col lg={8}>
          <p
            style={{
              whiteSpace: 'nowrap',
              fontSize: '15px',
              marginTop: '4px',
              marginLeft: '8px',
            }}
          >
            {log?.username}
          </p>
        </Col>
      </Row>
      <br />
      <Row>
        <span>
          <p style={{ fontSize: '15px', marginTop: '5px' }}>
            <b>{log?.title}</b>
          </p>
          <br />
          <p style={{ fontSize: '12px' }}>{log?.contents}</p>
        </span>
      </Row>
      <Row>
        <div style={{ marginTop: '30px' }}>
          <SButton onClick={deleteBtnHandler}>삭제</SButton>
        </div>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  padding-left: 50px;
`;

const SButton = styled.button`
  background-color: tomato;
  border: 0;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
`;
