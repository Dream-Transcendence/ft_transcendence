import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { PROFILEURL, SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseUserProfileData } from '../../types/Profile.type';
import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { SearchPropsType } from '../../types/search.type';

function AutoComplateSerchBox(props: {searchProps: SearchPropsType}) {
  const {url, prams, fn, action} = props.searchProps;
  const navigate = useNavigate();
  const {nickname : atomNickname} = useRecoilValue(userDataAtom);
  const [userList, setUserList] = useState<BaseUserProfileData[]>([]); //navigate 하기 위함
  const [value, setValue] = useState<string | null>(null);

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
          setUserList(list);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getSearchUser();
  }, [value]);

  //닉네임 배열 만들기
  const nicknameList = userList.map((user) => {
    return user.nickname;
  });

  //리스트 클릭시 user내에 기입한 글자를 포함하는 최초의 nickname을 target으로 넣어 해당 id로 이동
  const handleEvent = (e: any) => {
    if (e.key === 'Enter') {
      const target = userList.find((user) => {
        if (e.target.value)
          return user.nickname.includes(e.target.value);
        return atomNickname //값이 이상하면 기본 값으로 초기화
      });
      if (target) {
        setValue(target.nickname);
        navigate(`${PROFILEURL}/${target?.id}`);
      }
    }
  };

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
        selectOnFocus //포커스한 애 선택 가능
        clearOnBlur //검색 재개
        // props: The props to apply on the li element.
        // option: The option to render.
        renderOption={(props, option) => <li {...props} >{option}</li>} //search list
        sx={{ width: 200 }}
        freeSolo //이 속성을 주지 않으면 배열에 없는 값을 입력했을 때 not option이 표시됨
        //입력을 렌더링
        renderInput={(params) => <TextField {...params} label="Search" onKeyDown={handleEvent}/>}
      />
    </Fragment>
  );
}

export default AutoComplateSerchBox;
