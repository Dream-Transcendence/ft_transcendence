import {
  ButtonGroup,
  CheckboxIcon,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import styled from '@emotion/styled';
import { Edit } from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { BaseUserProfileData } from '../../types/Profile.type';

function OtherProfileNicname(props: { userData: BaseUserProfileData }) {
  const { nickname } = props.userData;
  return <Typography>{nickname}</Typography>;
}

export default OtherProfileNicname;
