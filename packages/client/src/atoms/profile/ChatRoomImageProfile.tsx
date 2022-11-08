import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { RoomInfoSet } from '../../types/Room.type';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CenteredContent = styled('div')(({ theme }) => ({
  display: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '-2%',
  marginTop: '7%',
}));

const ChatRoomImageProfile = (props: { roomInfoSet: RoomInfoSet }) => {
  const { roomInfo, handler: setRoomInfo } = props.roomInfoSet;
  const [image, setImage] = useState<FormData | undefined>();
  const { roomId } = useParams();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      if (setRoomInfo !== undefined)
        setRoomInfo({ ...roomInfo, image: URL.createObjectURL(newImage) });
      const formData = new FormData();
      formData.append('file', newImage);
      setImage(formData);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (image) {
      event.preventDefault(); //저장을 위해 연결된 기본동작 막아주기
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/rooms/${roomId}`, image)
        .then((response) => {
          console.log('이미지 변경 성공');
          setImage(undefined);
        })
        .catch((error) => {
          alert(error);
          console.log('error : ', error);
        });
    }
  };

  return (
    <CenteredContent>
      <Avatar
        alt="Avatar"
        src={roomInfo.image}
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
            fontSize: '15px',
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
