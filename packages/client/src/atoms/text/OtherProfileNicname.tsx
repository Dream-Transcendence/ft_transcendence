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


function OtherProfileNicname() {
    /* Here's a custom control */
    const otherName = 'doyun';
    return (
        <Typography>
            {otherName}
        </Typography>
    );
}

export default OtherProfileNicname;
