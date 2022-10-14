// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { SERVERURL } from '../../configs/Link.url';
// import { userDataAtom } from '../../pages/PingpongRoutePage';
// import { useRecoilValue } from 'recoil';

// function AutoComplateSerchBox() {
// 	const {id} = useRecoilValue(userDataAtom);
// 	// const {inputValue, setInputValue} = useState('');
//   useEffect(() => {
// 		async function getUser() {
// 			try {
// 				const response = await axios.get(`${SERVERURL}/users/${id}/friends`);
// 				if (response.status === 200) {
// 					console.log('유저목록 받아왔음');
// 				}
// 			} catch (error) {
// 				alert(error);
// 				console.log(error);
// 			}
// 		}
// 		getUser();
//   },)

//   return (
//     <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={top100Films}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Search" />}
//     />
//   );
// }

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { OpacityOutlined } from '@mui/icons-material';

interface FilmOptionType {
  inputValue?: string;
  id: number;
  nickname?: string;
	image?: string;
}
const filter = createFilterOptions<FilmOptionType>();

function AutoComplateSerchBox() {
  const [value, setValue] = React.useState<{ id: number; nickname: string; image: string; } | null | undefined>(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
			id: 0,
			nickname: '',
			image: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
		id: 0,
		nickname: '',
		image: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      id: dialogValue.id,
      nickname: dialogValue.nickname,
			image: dialogValue.image
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
				//자동 완성의 값입니다.값을 선택하려면 옵션과 참조가 동일해야 합니다.
        value={value}
        onChange={(event, newValue) => { //값이 변경되면 콜백이 시작됩니다. 콜백 이벤트 소스, 구성요소의 새 값
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                id: 0,
                nickname: newValue,
								image: newValue,
              });
            });
          } else if (newValue) {
            toggleOpen(true);
            setDialogValue({
							id: newValue.id,
							nickname: newValue.nickname,
							image: newValue.image,
            });
          } else {
            setValue(newValue);
          }
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
        renderOption={(props, option) => <li {...props}>{option.nickname}</li>}
        sx={{ width: 300 }}
        freeSolo
				//입력을 렌더링
        renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
      />
    </React.Fragment>
  );
}

export default AutoComplateSerchBox;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ id: 1, nickname: 'dha', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  { id: 2, nickname: 'hybae', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
	{ id: 3, nickname: 'huchoi', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  { id: 4, nickname: 'junghan', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
	{ id: 5, nickname: 'doyun', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
  { id: 6, nickname: 'sonkang', image: 'https://cdn.intra.42.fr/users/dha.jpg' },
]