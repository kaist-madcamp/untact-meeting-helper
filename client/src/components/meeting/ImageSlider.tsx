import React from 'react';
import { Carousel } from 'antd';
import { API_ENDPOINT } from '../../lib/constant';

interface Props {
  images: string[];
}

const ImageSlider = ({ images }: Props) => {
  return (
    <div>
      <Carousel autoplay>
        {images.map((image) => (
          <div key={image}>
            <img
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
              src={`${API_ENDPOINT}/${image}`}
              alt="postImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
