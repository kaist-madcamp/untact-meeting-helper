import React, { useEffect, useState } from 'react';
import { Col, Card, Row, Avatar, Button } from 'antd';
import PageLayout from '../components/PageLayout';
import Axios from '../lib/defaultClient';
import ImageSlider from '../components/meeting/ImageSlider';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface PostType {
  title: string;
  id: string;
  content: string;
  images: string[];
}

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    Axios.get('/post/getPosts').then((response) => {
      console.log(response);
      if (response.data.ok) {
        setLogs(response.data.meetingLogs);
      } else {
        alert('Failed to fectch product datas');
      }
    });
  }, []);

  const renderCards = logs?.map((post: PostType, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Link to={`/meeting-log/${post.id}`}>
          <Card
            key={index}
            hoverable={true}
            cover={<ImageSlider images={post.images} />}
          >
            <Meta title={post.title} description={post.content} />
          </Card>
        </Link>
      </Col>
    );
  });

  return (
    <PageLayout title="Home" useAuthInput={useAuthInput}>
      <div style={{ width: '75%', margin: '3rem auto' }}>
        {logs?.length === 0 ? (
          <div
            style={{
              display: 'flex',
              height: '300px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>No post yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]} style={{ display: 'center' }}>
              {renderCards}
            </Row>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
