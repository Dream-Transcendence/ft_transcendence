import { Avatar, IconButton } from '@mui/material';
import { CustomUploadProps } from '../../../types/Link.type';

function FileUploadButton(props: { uploadProps: CustomUploadProps }) {
  const { icon, ref, action } = props.uploadProps;
  return (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      onClick={action}
    >
      <input hidden accept="image/*" type="file" ref={ref} />
      {icon}
    </IconButton>
  );
}

export default FileUploadButton;
