import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import type { PostType } from './types';

interface ImageType {
    original: string;
}

interface Props {
    posts: PostType;
}

function PostImage({posts} : Props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (posts?.images && posts?.images?.length > 0) {
            let images : any = [];
            // console.log(props.detail.images)

            posts?.images && posts?.images.map(item => {
                images.push({
                    original: `http://192.249.18.120:80/${item}`,
                })
            })
            setImages(images)
        }
    }, [posts])

    return (
        <div >
            <ImageGallery items={Images} />
        </div>
    )
}

export default PostImage