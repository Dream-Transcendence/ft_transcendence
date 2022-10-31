import { IconButton } from '@mui/material';
import { CustomIconProps } from '../../../types/Link.type';

function CustomIconButton(props: { customProps: CustomIconProps }) {
  const { icon, action } = props.customProps;

  return (
    <IconButton onClick={action} aria-label="button" size="large">
      {icon}
    </IconButton>
  );
}

export default CustomIconButton;
