import styled from '@emotion/styled';
import ReactLoading from 'react-loading';

const LoaderWrap = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10%',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
}));

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#A593E0" />
    </LoaderWrap>
  );
};

export default Loader;
