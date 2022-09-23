import styled from '@emotion/styled';
import { Button } from '@mui/material';

const BottonComponentLayout = styled('button')(({ theme }) => ({
    alignContents: 'center',
    backgroundColor: '#00FF0000',
}));

function ButtonByText(props: { value: string | undefined }) {
    const { value } = props;

    return (
        <BottonComponentLayout>
            <Button variant="text">
                {value}
            </Button>
        </BottonComponentLayout>
    );
}

export default ButtonByText;