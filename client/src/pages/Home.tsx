import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Avatar, Button } from 'antd';
import ImageSlider from './ImageSlider';


const { Meta } = Card;

interface PostType {
    title: string;
    images: string[];
   
  }
  
interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Home({ useAuthInput }: Props) {
    const [Posts, setPosts] = useState([])
    // const [userList, setuserList] = useState([]);

    useEffect(() => {
        Axios.get('http://192.249.18.120:80/post/getPosts')
            .then(response => {
                console.log("getPosts");
                if (response.data.ok) {
                    setPosts(response.data.posts)
                    console.log('posts', response.data.posts)
                } else {
                    alert('Failed to fectch product datas')
                }
            })

    }, [])

    const renderCards = Posts.map((post: PostType, index) => {

        return <Col key={index} lg={6} md={8} xs={24}>
            <Card 
                key={index}
                hoverable={true}
                cover={<ImageSlider images={post.images} />}
            >
                <Meta
                    title={post.title}
                />
            </Card>
        </Col>

    })


    return (
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
        <br /><br />
        </div>
    )
}