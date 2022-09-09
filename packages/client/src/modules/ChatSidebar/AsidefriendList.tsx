import { styled } from '@mui/material/styles';

const AsideFriendListLayout = styled('div')(({ theme }) => ({
  height: '74%',
}));

function AsideFriendListModule() {
  return <AsideFriendListLayout></AsideFriendListLayout>;
}

export default AsideFriendListModule;
