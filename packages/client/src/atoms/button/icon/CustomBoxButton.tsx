import { Box, IconButton } from '@mui/material';

function CustomIconButton(props: { element: React.ReactElement }) {
    const { element } = props;
    return (
        <Box>
            {element}
        </Box>
    );
}

export default CustomIconButton;
