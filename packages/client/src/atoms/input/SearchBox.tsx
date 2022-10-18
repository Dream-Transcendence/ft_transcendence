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

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: '100%',
  marginLeft: 'auto',
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// const AutoWrapper = styled('div')(({ theme }) => ({
//   height: '100%',
//   position: 'relative',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      '&:focus': {
        width: '70%',
      },
    },
  },
}));

function SearchBox() {
  const [target, setTarget] = useState<number>(0);
  const navigate = useNavigate();
  const searchProps: SearchPropsType = {
    url: `${SERVERURL}/users/search`,
    listParams: {
      value: target,
      setValue: setTarget,
    },
  }

  useEffect(() => {
    if (target > 0)
      navigate(`${PROFILEURL}/${target}`);
  }, [target, navigate])

  return (
    <Search>
      {/* <AutoWrapper> */}
        <AutoComplateSerchBox searchProps={searchProps}/>
      {/* </AutoWrapper> */}
      {/* [axios GET 요청] Input value에 따른 인원목록 */}
      {/* 리스트 추가 후, 해당 유저 페이지로 연결하는 로직 구현해야함 */}
    </Search>
  );
}

export default SearchBox;
