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
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="ProfileNicname"
        icon={<ClearIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="ProfileNicname"
        size="sm"
        icon={<SaveAltIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
}

function ProfileNicname() {
  /* Here's a custom control */

  const ProfileNicnameLayout = styled('text')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: '100%',
  }));

  return (
    <Editable
      textAlign="center"
      defaultValue="sonkang ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
      padding="1rea"
    >
      <ProfileNicnameLayout>
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </ProfileNicnameLayout>
    </Editable>
  );
}

export default ProfileNicname;
