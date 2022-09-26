import { IconButton } from '@mui/material';

function CustomIconButton(props: { element: React.ReactElement }) {
  const { element } = props;
  return (
    <IconButton aria-label="game" size="large">
      {element}
    </IconButton>
  );
}

export default CustomIconButton;
