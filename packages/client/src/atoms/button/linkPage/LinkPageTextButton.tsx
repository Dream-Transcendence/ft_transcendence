import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { LinkTextResource } from '../../../types/Link.type';

function LinkPageTextButton(props: { LinkTextResource: LinkTextResource }) {
  const { url, content, handler } = props.LinkTextResource;

  return (
    <Link style={{ textDecoration: 'none' }} to={url}>
      <Button variant="contained" onClick={handler}>
        {content}
      </Button>
    </Link>
  );
}

export default LinkPageTextButton;
