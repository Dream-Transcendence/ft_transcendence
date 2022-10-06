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
import { TextField } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userDataAtom } from '../../pages/PingpongRoutePage';
import { BaseUserProfileData } from '../../types/Profile.type';

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="ProfileNicname"
        icon={<DoneIcon />}
        {...getSubmitButtonProps}
      />
      <IconButton
        aria-label="ProfileNicname"
        icon={<ClearIcon />}
        {...getCancelButtonProps}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="ProfileNicname"
        size="sm"
        icon={<SaveAltIcon />}
        {...getEditButtonProps}
      />
    </Flex>
  );
}

const ProfileNicnameLayout = styled('span')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  paddingLeft: '0.5rem',
}));

function ProfileNicname() {
  /* Here's a custom control */
  const [user, setUser] = useRecoilState<BaseUserProfileData>(userDataAtom);

  return (
    //[axios GET 요청] 프로필 이름
    <Editable
      textAlign="center"
      defaultValue={`${user.nickname}`}
      fontSize="1.5rem"
      isPreviewFocusable={false}
      padding="1rea"
    >
      <ProfileNicnameLayout>
        <EditablePreview />
        {/* Here is the custom input */}
        {/* [axios PATCH 요청] 본인의 프로필 변경 */}
        <Input as={EditableInput} />
        <EditableControls />
      </ProfileNicnameLayout>
    </Editable>
  );
}

export default ProfileNicname;
