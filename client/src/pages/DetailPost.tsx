import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import PostImage from './detail/PostImage';
import PostInfo from './detail/PostInfo';
// import PostButton from './Sections/PostButton.js'
import { Row, Col, Button, Menu, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import type { PostType } from './detail/types';

function DetailPost(props: any) {
    const postId = props.match.params.postId
    const [Posts, setPosts] = useState<PostType>()
    const [VisibleBtn, setVisibleBtn] = useState(true)

    const postVariable = {
        postId: postId
    }

    useEffect(() => {
        Axios.post('http://192.249.18.120:80/post/post_by_id', postVariable)
            .then(response => {
                console.log('postInfo', response.data.post);
                setPosts(response.data.post)
            })
    }, [])


    const deletePost = (e: any) => {
        if (window.confirm("Really Delete?") == true) {
            Axios.delete('http://192.249.18.120:80/post/delete', { data: { postId: postId }, withCredentials: true })
                .then(response => {
                    if (response.data.ok) {
                        // props.refreshFunction(response.data.post)
                        alert("Succesfully Delete")
                        props.history.push("/home");
                    } else {
                        alert('Failed to save Comment')
                    }
                })
        }
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <a onClick={deletePost}>
                Delete
            </a>
          </Menu.Item>
        </Menu>
      );


    return (
        <div className="postPage" style={{ marginLeft: '270px', marginRight: '270px' }}>
            {Posts?.images?.length !== 0  && (
                <Row gutter={[16, 16]} >
                    <Col lg={12} xs={24} >
                        <PostImage posts={Posts!}/>
                    </Col>
                    <Col lg={1} xs={2}/>
                    <Col lg={11} xs={24}>
                        {Posts?.writer?._id === localStorage.getItem("TOKEN") && VisibleBtn &&
                            <Dropdown overlay={menu}>
                                <MoreOutlined style={{float: 'right'}}>
                                    <DownOutlined />
                                </MoreOutlined>
                            </Dropdown>
                        }
                        <PostInfo detail={Posts} />
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default withRouter(DetailPost)