import React, { useState } from 'react'
import { Typography, Button, Form, Input} from 'antd';
import FileUpload from './FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function Upload(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            // writer: props.user.userData._id,
            title: TitleValue,
            images: Images,
        }

        Axios.post('/post/uploadPost', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Posts Successfully Uploaded')
                    // props.history.push('/')
                } else {
                    alert('Failed to upload Posts')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload your Posts</Title>
            </div>
            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title </label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                    placeholder="Title here"
                />
                <br />
                <br />
                <Button onClick={onSubmit}>
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default Upload