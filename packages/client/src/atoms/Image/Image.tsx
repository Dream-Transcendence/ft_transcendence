import styled from '@emotion/styled';

const ImageLayout = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%', //받아오는 이미지의 크기가 정해져 있어 width가 더 클경우 height 로 조절해주어야함
}));

function ImageComponent(props: { title: string; image: string }) {
  const { image, title } = props;
  return (
    <ImageLayout>
      <img
        src={`${
          image
            ? image
            : '/Users/doyun/goinfre/ft_transcendence/packages/client/src/assets/pong.png'
        }`}
        alt={title ? title : 'image'}
        loading="lazy"
      />
    </ImageLayout>
  );
}

export default ImageComponent;
