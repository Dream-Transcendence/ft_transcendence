import { Button } from '@mui/material';
import { LinkTextResource } from '../../../types/Link.type';

function LinkPageTextButton(props: { LinkTextResource: LinkTextResource }) {
  const { content, handler, style } = props.LinkTextResource;

  return (
    // <Link style={{ textDecoration: 'none' }} to={url}>
    <Button sx={style} variant="contained" onClick={handler}>
      {content}
    </Button>
    // </Link>
  );
}

export default LinkPageTextButton;
