import { Link } from 'react-router-dom';
import { CustomIconProps, LinkIconProps } from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';

function LinkPageIconButton(props: { linkIconProps: LinkIconProps }) {
  const { iconResource, action, style } = props.linkIconProps;
  const customProps: CustomIconProps = {
    icon: iconResource.icon,
    action: action,
  };

  return (
    <Link style={style} to={iconResource.url}>
      <CustomIconButton customProps={customProps} />
    </Link>
  );
}

export default LinkPageIconButton;
