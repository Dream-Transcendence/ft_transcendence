import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { BaseUserProfileData } from '../../types/Profile.type';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SearchPropsType } from '../../types/search.type';
import { useNavigate } from 'react-router-dom';
import { PROFILEURL } from '../../configs/Link.url';
import { userDataAtom } from '../../recoil/user.recoil';

function AutoComplateSerchBox(props: { searchProps: SearchPropsType }) {
  const { url, listParams, action } = props.searchProps; //혹시 action 쓸 일 있을까봐 넣어두었습니다.
  const { value: parentTarget, setValue: setParentTarget } = listParams; //부모컴포넌트에서 target의 변경을 감지하기 위함입니다.
  // const { nickname: atomNickname } = useRecoilValue(userDataAtom);
  const [userList, setUserList] = useState<BaseUserProfileData[]>([]); //navigate 하기 위함
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          nickname: value,
        },
      })
      .then((response: any) => {
        const searched: BaseUserProfileData[] = response.data;
        console.log('검색결과 받기', searched);
        setUserList([...searched]);
      })
      .catch((error) => {
        // alert(error); //사용자에게 보여주지 않아도 되는 정보는 삭제
        console.log(error);
      });
  }, [url, value]);

  //닉네임 배열 만들기
  const nicknameList = userList.map((user) => {
    return user.nickname;
  });

  //리스트 클릭시 user내에 기입한 글자를 포함하는 최초의 nickname을 target으로 넣어 해당 id로 이동
  // const handleEvent = (e: any) => {
  //   if (e.key === 'Enter') {
  //     console.log('엔터 키가 눌렸습니다.');
  //     const target = userList.find((user) => {
  //       if (e.target.value && user.nickname.includes(e.target.value))
  //         return true;
  //       return false; //값이 이상하면 기본 값으로 초기화
  //     });
  //     if (target) {
  //       setValue('');
  //       setParentTarget({ ...parentTarget, nickname: e.target.value });
  //       // navigate(`${PROFILEURL}/${target?.id}`);
  //     }
  //   }
  // };

  const handleChange = (e: any) => {
    if (e.target.value) {
      setValue('');
      setParentTarget({ ...parentTarget, nickname: e.target.value });
    }
  };

  return (
    <Autocomplete
      //자동 완성의 값입니다.값을 선택하려면 옵션과 참조가 동일해야 합니다.
      value={value}
      id="search-box"
      options={nicknameList} //옵션 배열
      getOptionLabel={(option) => {
        //값 입력시 해당하는 list출력
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        return option;
      }}
      selectOnFocus //포커스한 애 선택 가능
      clearOnBlur //검색 재개
      // props: The props to apply on the li element.
      // option: The option to render.
      renderOption={(props, option) => <li {...props}>{option}</li>} //search list
      sx={{ width: '100%' }}
      freeSolo //이 속성을 주지 않으면 배열에 없는 값을 입력했을 때 not option이 표시됨
      //입력을 렌더링
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          onChange={handleChange}
          // onKeyDown={handleEvent}
        />
      )}
    />
  );
}

export default AutoComplateSerchBox;
