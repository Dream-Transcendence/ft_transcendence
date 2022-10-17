import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { OpacityOutlined } from '@mui/icons-material';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseUserProfileData, FriendType } from '../../types/Profile.type';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { relative } from 'node:path/win32';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';

interface FilmOptionType {
  inputValue?: string;
  id: number;
  nickname?: string;
  image?: string;
}
// const filter = createFilterOptions<FilmOptionType>();

function AutoComplateSerchBox() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<BaseUserProfileData[]>([]);
  const [value, setValue] = useState<string | null>(null);
  console.info('3', value);
  useEffect(() => {
    async function getSearchUser() {
      try {
        const response = await axios.get(`${SERVERURL}/users/search`, {
          params: {
            nickname: value,
          },
        });
        if (response.status === 200 && response.data.length > 0) {
          const list: BaseUserProfileData[] = response.data.map(
            (person: BaseUserProfileData) => {
              return person;
            },
          );
          console.log('?', list);
          setUserList(list);
          console.log('123', userList);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getSearchUser();
  }, [value]);
  console.log('baby whyiimso lonely', userList);

  const nicknameList = userList.map((user) => {
    return user.nickname;
  });

  // const handleClick = () => {
  //   const target = userList.find((user) => {
  //     return user.nickname === value;
  //   });
  //   navigate(`${PROFILEURL}/${target?.id}`);
  // };

  return (
    <Fragment>
      <Autocomplete
        //자동 완성의 값입니다.값을 선택하려면 옵션과 참조가 동일해야 합니다.
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        id="free-solo-dialog-demo"
        options={nicknameList} //옵션 배열
        getOptionLabel={(option) => {
          //값 입력시 해당하는 list출력
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option) {
            return option;
          }
          return option;
        }}
        selectOnFocus
        clearOnBlur //검색 재개
        // props: The props to apply on the li element.
        // option: The option to render.
        renderOption={(props, option) => <li {...props}>{option}</li>} //search list
        sx={{ width: 200 }}
        freeSolo //이 속성을 주지 않으면 배열에 없는 값을 입력했을 때 not option이 표시됨
        //입력을 렌더링
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </Fragment>
  );
}

export default AutoComplateSerchBox;
