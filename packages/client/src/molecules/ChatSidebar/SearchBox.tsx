import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AutoComplateSerchBox from '../../atoms/input/AutoCompleteSerchBox';
import SearchBox from '../../atoms/input/SearchBox';
import { CHATROOMURL, SERVERURL } from '../../configs/Link.url';
import { SearchPropsType } from '../../types/search.type';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import useSearch from '../../hooks/useSearch';
import { DM } from '../../configs/RoomType';

/*
 * AsideSearchBox로 감싼 이유는
 * 공통적으로 사용하는 searchBox가 상위 레이아웃에 기반하여 모양을 잡기 때문
 * 예) 상위 레이아웃이 w: 50px에 h: 40px 이면 search box도 마찬가지 크기가 됨.
 */
const AsideSearchBox = styled('div')(({ theme }) => ({
  minHeight: '56px',
  height: '82%',
  width: '90%',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3%',
  marginBottom: '3%',
}));

const SearchBoxLayout = styled('div')(({ theme }) => ({
  height: '65px',
  marginLeft: '2%',
  marginRight: '2%',
  marginBottom: '2%',
  width: '97%',
  backgroundColor: '#046EB155',
  display: 'flex',
  justifyContent: 'center',
}));

function SearchBoxModule() {
  const user = useRecoilValue(userDataAtom);
  const searchProps = useSearch(
    `${SERVERURL}/users/${user.id}/friends/search`,
    CHATROOMURL,
    DM,
  );

  return (
    <SearchBoxLayout>
      <AsideSearchBox>
        <SearchBox searchProps={searchProps} />
      </AsideSearchBox>
    </SearchBoxLayout>
  );
}

export default SearchBoxModule;
