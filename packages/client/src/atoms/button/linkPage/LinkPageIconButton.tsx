import { Link } from 'react-router-dom';
import {
  CustomIconProps,
  LinkIconProps,
  LinkIconResource,
} from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';

function LinkPageIconButton(props: { linkIconProps: LinkIconProps }) {
  const { iconResource, action } = props.linkIconProps;
  const customProps: CustomIconProps = {
    icon: iconResource.icon,
    action: action,
  };

  return (
    <Link style={{ textDecoration: 'none' }} to={iconResource.url}>
      <CustomIconButton customProps={customProps} />
    </Link>
  );
}

export default LinkPageIconButton;
