import { Box, IconButton } from '@mui/material';

function CustomBoxButton(props: { element: React.ReactElement }) {
  const { element } = props;
  return <Box>{element}</Box>;
}

export default CustomBoxButton;
