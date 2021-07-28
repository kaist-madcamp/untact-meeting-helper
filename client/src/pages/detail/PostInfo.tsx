import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Avatar, Row, Col, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { PostType } from './types';

export default function PostInfo(props: any) {

    const [Post, setPost] = useState<PostType>()

    useEffect(() => {
        setPost(props.detail)
    }, [props.detail])

    console.log('Info', Post);
    // console.log("Writer", Writer.name);

    return (
        <div>
            <Row>
                <Col >
                    <Avatar size={32} icon={<UserOutlined />}/>
                </Col>
                <Col lg={8}>
                    <p style={{ fontSize: '15px', marginTop: '4px', marginLeft: '8px' }}>{Post?.writer?.name}</p>
                </Col>
            </Row>
            <br />
            <Row>
                <span><p style={{fontSize: '15px', marginTop: '5px'}}><b>{Post?.title}</b></p><br/>
                    <p style={{fontSize: '12px'}}>{Post?.content}</p></span>
            </Row>
        </div>
    )
}