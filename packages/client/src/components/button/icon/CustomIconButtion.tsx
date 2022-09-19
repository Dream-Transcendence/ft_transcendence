import { IconButton } from '@mui/material';

function CustomIconButton(element: React.ReactElement) {
  return (
    <IconButton aria-label="game" size="large">
      {element}
    </IconButton>
  );
}

export default CustomIconButton;
