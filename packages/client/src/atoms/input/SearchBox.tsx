import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import AutoComplateSerchBox from './AutoCompleteSerchBox';
import { Flex } from '@chakra-ui/react';
import { SearchPropsType } from '../../types/search.type';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import { Navigate, useNavigate } from 'react-router-dom';
import { BaseUserProfileData } from '../../types/Profile.type';
import axios from 'axios';

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
