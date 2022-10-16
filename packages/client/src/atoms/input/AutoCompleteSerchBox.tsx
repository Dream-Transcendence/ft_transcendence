import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { OpacityOutlined } from '@mui/icons-material';
import { SERVERURL } from '../../configs/Link.url';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseUserProfileData, FriendType } from '../../types/Profile.type';
import { Fragment, useEffect, useState } from 'react';

interface FilmOptionType {
  inputValue?: string;
  id: number;
  nickname?: string;
  image?: string;
}
// const filter = createFilterOptions<FilmOptionType>();

function AutoComplateSerchBox() {
  const { id } = useParams();
  // const { userList, setUserList } = React.useState<BaseUserProfileData[]>([{
  //   id: 0,
  //   nickname: 'hi',
  //   image: 'hi',
  // }]);
  const [value, setValue] = useState<
    string | { id: number; nickname: string; image: string } | null | undefined
  >(null);
  // const [open, toggleOpen] = React.useState(false);

  // useEffect(() => {
  //   async function getAllUser() {
  //     try {
  //       const response = await axios.get(`${SERVERURL}/users/${id}/friends`);
  //       if (response.status === 200) {
  //         const list: BaseUserProfileData[] = response.data.map(
  //           (person: FriendType) => {
  //             return person.user;
  //           },
  //         );
  //         // setUserList(list);
  //       }
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   }
  //   getAllUser();
  // });
  // const handleClose = () => {
  //   setDialogValue({
  //     id: 0,
  //     nickname: '',
  //     image: '',
  //   });
  //   toggleOpen(false);
  // };

  // const [dialogValue, setDialogValue] = React.useState({
  //   id: 0,
  //   nickname: '',
  //   image: '',
  // });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setValue({
  //     id: dialogValue.id,
  //     nickname: dialogValue.nickname,
  //     image: dialogValue.image,
  //   });
  //   handleClose();
  // };

  return (
    <Fragment>
      <Autocomplete
        //자동 완성의 값입니다.값을 선택하려면 옵션과 참조가 동일해야 합니다.
        value={value}
        onChange={(event, newValue) => {
          //값이 변경되면 콜백이 시작됩니다. 콜백 이벤트 소스, 구성요소의 새 값
          // if (typeof newValue === 'string') {
          //   setValue(newValue);

          //   // timeout to avoid instant validation of the dialog's form.
          //   // setTimeout(() => {
          //   //   //setTimeout 지웠을 때 차이를 못느낌..
          //   //   //  toggleOpen(true);
          //   //   setDialogValue({
          //   //     id: 0,
          //   //     nickname: newValue,
          //   //     image: newValue,
          //   //   });
          //   // });
          // } else if (newValue) {
          //   // toggleOpen(true);
          //   setDialogValue({
          //     id: newValue.id,
          //     nickname: newValue.nickname,
          //     image: newValue.image,
          //   });
          // } else {
          setValue(newValue);
          // }
        }}
        // filterOptions={(options, params) => {
        //   const filtered = filter(options, params);

        //   if (params.inputValue !== '') {
        //     filtered.push({
        //       inputValue: params.inputValue,
        //       title: `Add "${params.inputValue}"`,
        //     });
        //   }

        //   return filtered;
        // }}
        id="free-solo-dialog-demo"
        options={top100Films} //옵션 배열
        getOptionLabel={(option) => {
          //값 입력시 해당하는 list출력
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.nickname) {
            return option.nickname;
          }
          return option.nickname;
        }}
        selectOnFocus
        clearOnBlur //검색 재개
        handleHomeEndKeys
        // props: The props to apply on the li element.
        // option: The option to render.
        renderOption={(props, option) => (
          <li {...props}>
            {typeof option === 'string' ? option : option.nickname}
          </li>
        )} //search list
        sx={{ width: 300 }}
        freeSolo
        //입력을 렌더링
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </Fragment>
  );
}

export default AutoComplateSerchBox;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { id: 1, nickname: 'dha', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  { id: 2, nickname: 'hybae', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  { id: 3, nickname: 'huchoi', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  {
    id: 4,
    nickname: 'junghan',
    image: 'https://cdn.intra.42.fr/users/dha.jpg',
  },
  { id: 5, nickname: 'doyun', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  {
    id: 6,
    nickname: 'sonkang',
    image: 'https://cdn.intra.42.fr/users/dha.jpg',
  },
];
