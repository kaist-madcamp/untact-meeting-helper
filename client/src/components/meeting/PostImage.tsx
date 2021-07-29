import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { API_ENDPOINT } from '../../lib/constant';
import type { MeetingLogType } from './types';
import styled from 'styled-components';

interface Props {
  log: MeetingLogType;
}

function PostImage({ log }: Props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (log?.images?.length > 0) {
      let images: any = [];

      log?.images?.map((img) => {
        images.push({
          original: `${API_ENDPOINT}/${img}`,
        });
      });
      setImages(images);
    }
  }, []);

  return (
    <Container>
      <ImageGallery items={Images} />
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
`;

export default PostImage;
