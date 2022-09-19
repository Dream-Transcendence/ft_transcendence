import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styled from '@emotion/styled';

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    }
]

const ImageLayout = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '100%', //받아오는 이미지의 크기가 정해져 있어 width가 더 클경우 height 로 조절해주어야함
}))

function ImageComponent(props: { title: string | undefined, image: string | undefined }) {
    const { image, title } = props;
    return (
        <ImageLayout>
            <img
                src={`${image ? image : 'https://images.unsplash.com/photo-1549388604-817d15aa0110'}`}
                alt={title ? title : 'image'}
                loading="lazy"
            />
        </ImageLayout>
    );
}


export default ImageComponent;
