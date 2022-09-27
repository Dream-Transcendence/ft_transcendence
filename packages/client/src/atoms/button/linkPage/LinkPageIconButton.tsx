import { Link } from 'react-router-dom';
import { LinkIconResource } from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';

function LinkPageIconButton(props: { LinkIconResource: LinkIconResource }) {
  const { url, icon } = props.LinkIconResource;

  return (
    <Link style={{ textDecoration: 'none' }} to={url}>
      <CustomIconButton element={icon} />
    </Link>
  );
}

export default LinkPageIconButton;
