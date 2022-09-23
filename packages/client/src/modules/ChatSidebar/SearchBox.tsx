import { styled } from '@mui/material/styles';
import SearchBox from '../../components/input/SearchBox';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const AsideSearchBox = styled('div')(({ theme }) => ({
  height: '65%',
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3%',
  marginBottom: '3%',
}));

const SearchBoxLayout = styled('div')(({ theme }) => ({
  marginLeft: '2%',
  marginRight: '2%',
  marginBottom: '2%',
  width: '97%',
  height: '7%',
  backgroundColor: '#046EB155',
  display: 'flex',
  justifyContent: 'center',
}));

function SearchBoxModule() {
  return (
    <SearchBoxLayout>
      <AsideSearchBox>
        <SearchBox />
      </AsideSearchBox>
    </SearchBoxLayout>
  );
}

export default SearchBoxModule;
