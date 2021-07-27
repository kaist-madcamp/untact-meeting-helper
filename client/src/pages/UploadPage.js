import React, { useState } from 'react'
import { Typography, Button, Form, message, Input} from 'antd';
import FileUpload from './FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [ContentValue, setContentValue] = useState("")
    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !ContentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            title: TitleValue,
            content: ContentValue,
            images: Images,
        }

        Axios.post('http://192.249.18.120:80/post/uploadPost', variables)
            .then(response => {
                if (response.data.ok) {
                    alert('Posts Successfully Uploaded')
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
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Content</label>
                <TextArea
                    onChange={onContentChange}
                    value={ContentValue}
                />
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPage