import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import PageLayout from '../components/PageLayout';
import FileUpload from '../components/meeting/FileUpload';
import Axios from '../lib/defaultClient';
import { API_ENDPOINT } from '../lib/constant';

const { Title } = Typography;
const { TextArea } = Input;

interface onSubmit {
  title: string;
  content: string;
  images: string[];
}

interface Props {
  useAuthInput: [boolean, (userId: string | undefined) => void];
}

export default function Upload({ useAuthInput }: Props) {
  const [TitleValue, setTitleValue] = useState('');
  const [ContentValue, setContentValue] = useState('');
  const [Images, setImages] = useState<string[]>([]);

  const onTitleChange = (event: any) => {
    setTitleValue(event.currentTarget.value);
  };

  const onContentChange = (event: any) => {
    setContentValue(event.currentTarget.value);
  };

  const updateImages = (newImages: string[]) => {
    setImages(newImages);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (!TitleValue || !ContentValue || !Images) {
      return alert('fill all the fields first!');
    }

    const variables = {
      title: TitleValue,
      contents: ContentValue,
      images: Images,
    };

    console.log('variables : ', variables);

    Axios.post('/post/uploadPost', variables).then((response) => {
      if (response.data.ok) {
        alert('Posts Successfully Uploaded');
      } else {
        alert('Failed to upload Posts');
      }
    });
  };

  return (
    <PageLayout title="Upload" useAuthInput={useAuthInput}>
      <div
        style={{
          maxWidth: '700px',
          margin: '2rem auto',
          paddingBottom: '50px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}> Upload your Posts</Title>
        </div>
        <form onSubmit={onSubmit}>
          {/* DropZone */}
          <FileUpload refreshFunction={updateImages} />
          <br />
          <br />
          <label>Title</label>
          <Input onChange={onTitleChange} value={TitleValue} />
          <br />
          <br />
          <label>Content</label>
          <TextArea onChange={onContentChange} value={ContentValue} />
          <br />
          <br />
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      </div>
    </PageLayout>
  );
}
