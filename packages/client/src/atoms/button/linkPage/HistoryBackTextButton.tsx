import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { LinkTextResource } from '../../../types/Link.type';
import { useNavigate } from 'react-router-dom';

function HistoryBackTextButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="contained">
      취소하기
    </Button>
  );
}

export default HistoryBackTextButton;
