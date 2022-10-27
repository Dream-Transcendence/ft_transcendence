import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import React, { createRef, useRef, useState } from 'react';
import { Avatar } from '@mui/material';

const CenteredContent = styled('div')(({ theme }) => ({
  display: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '-2%',
  marginTop: '7%',
}));

const ChatRoomImageProfile = () => {
  const [image, setImage] = useState<any>(null);
  // const inputFileRef = useRef<any>();

  const cleanup = () => {
    URL.revokeObjectURL(image); // URL.createObjectURL(newImage)에 대한 이미지값을 초기화
    // console.log('??!!', inputFileRef.current.value);
    // inputFileRef.current.value = null;
  };

  const setCleanImage = (newImage: any) => {
    if (image) {
      // cleanup();
    }
    setImage(newImage);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setCleanImage(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (image) {
      event.preventDefault();
      setCleanImage(null);
    }
  };

  return (
    <CenteredContent>
      <Avatar
        alt="Avatar"
        src={image}
        imgProps={{
          style: {
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'cover',
          },
        }}
      />
      <input
        // ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload" //버튼과 아바타를 연결
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          style={{
            borderRadius: '100%',
            backgroundColor: '#00000000',
            width: '30px',
            height: '30px',
            fontSize: '1px',
            display: 'absolute',
            color: 'white',
            zIndex: '999',
            marginTop: '-90%',
            marginLeft: '-20%',
          }}
          component="span"
          onClick={handleClick}
        >
          {image ? '💾' : ''}
        </Button>
      </label>
    </CenteredContent>
  );
};

export default ChatRoomImageProfile;
