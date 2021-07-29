import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import Axios from '../../lib/defaultClient';
import { API_ENDPOINT } from '../../lib/constant';

interface Props {
  refreshFunction: (images: string[]) => void;
}

function FileUpload({ refreshFunction }: Props) {
  const [Images, setImages] = useState<string[]>([]);

  const onDrop = async (files: any) => {
    let formData = new FormData();

    formData.append('file', files[0]);
    //save the Image we chose inside the Node Server
    const response = await Axios.post('/post/uploadImage', formData);
    console.log(response);
    if (response.data.ok) {
      setImages([...Images, response.data.image]);
      refreshFunction([...Images, response.data.image]);
    } else {
      alert('Failed to save the Image in Server');
    }
  };

  const onDelete = (image: string) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined
              style={{ fontSize: '3rem', cursor: 'pointer' }}
              className="plusoutlined"
            />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images?.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img
              style={{
                minWidth: '300px',
                width: '300px',
                height: '240px',
                objectFit: 'contain',
              }}
              src={`${API_ENDPOINT}/${image}`}
            />
          </div>
        ))}

        {!Images && (
          <div>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src="error"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
