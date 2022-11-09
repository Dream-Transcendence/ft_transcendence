import { styled, alpha } from '@mui/material/styles';
import AutoComplateSerchBox from './AutoCompleteSerchBox';
import { SearchPropsType } from '../../types/search.type';

const Search = styled('div')(({ theme }) => ({
  width: '400px',
  marginBottom: '0.3vh',
  borderRadius: '0.2rem',
  backgroundColor: '#eeefff',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

function SearchBox(prop: { searchProps: SearchPropsType }) {
  const searchProps = prop.searchProps;
  return (
    <Search>
      <AutoComplateSerchBox searchProps={searchProps} />
      {/* [axios GET 요청] Input value에 따른 인원목록 */}
      {/* 리스트 추가 후, 해당 유저 페이지로 연결하는 로직 구현해야함 */}
    </Search>
  );
}

export default SearchBox;
