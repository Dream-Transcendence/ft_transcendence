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

const ProfileNicnameLayout = styled('text')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: '60%',
}));

function ProfileNicname() {
  /* Here's a custom control */
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
          aria-label="Search database"
          icon={<DoneIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Search database"
          icon={<ClearIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="Search database"
          size="sm"
          icon={<SaveAltIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    //새로 고침시 값이 저장이 안됨 -> 직접 구현해야 할 듯
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}

export default ProfileNicname;
