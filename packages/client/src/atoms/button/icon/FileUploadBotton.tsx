import { Avatar, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import { CustomUploadProps } from '../../../types/Link.type';

function FileUploadButton(props: { uploadProps: CustomUploadProps }) {
  const { icon, action } = props.uploadProps;

  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      // onClick={() => action}
    >
      <input hidden accept="image/*" type="file" onChange={action}/>
      {icon}
    </IconButton>
  );
}

export default FileUploadButton;
