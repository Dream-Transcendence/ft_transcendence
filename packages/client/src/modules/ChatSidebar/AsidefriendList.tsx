import { styled } from '@mui/material/styles';

const AsideFriendListLayout = styled('div')(({ theme }) => ({
  height: '74%', //분명 %는 상위 컴포넌트기준이라고 한 글을 본것 같은데 중간에서하니 삐져나온다 아마%가 맞긴한데 위치가 움직이면 삐져나오나보다
  border: 'solid black',
}));

function AsideFriendListModule() {
  return <AsideFriendListLayout></AsideFriendListLayout>;
}

export default AsideFriendListModule;
