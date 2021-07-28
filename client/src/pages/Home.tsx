import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Avatar, Button } from 'antd';
import ImageSlider from './utils/ImageSlider';
import PageLayout from '../components/PageLayout';

const { Meta } = Card;

interface PostType {
    title: string;
    _id: string;
    content: string;
    images: string[];
  }
  
interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
    const [Posts, setPosts] = useState([])
    // const [userList, setuserList] = useState([]);

    const userVariable = {
        userId: localStorage.getItem("TOKEN")
    };

    useEffect(() => {
        Axios.post('http://192.249.18.120:80/post/posts_by_user', userVariable)
            .then(response => {
                if (response.data.ok) {
                    setPosts(response.data.posts)
                    console.log('posts', response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })

    }, [])

    console.log("userId", localStorage.getItem("TOKEN"));

    const renderCards = Posts.map((post: PostType, index) => {

        return <Col key={index} lg={6} md={8} xs={24}>
            <a href={`/post/${post._id}`}>
                <Card
                    key={index}
                    hoverable={true}
                    cover={<ImageSlider images={post.images} />}
                >
                    <Meta
                        title={post.title}
                        description={post.content}
                    />
                </Card>
            </a>
        </Col>

    })


    return (
        <PageLayout title="Home" useAuthInput={useAuthInput}>
            <div style={{ width: '75%', margin: '3rem auto' }}>
                {Posts.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16,16]} style={{display: 'center'}}>
                            {renderCards}
                        </Row>
                    </div>
                }
            </div>
        </PageLayout>
    )
}