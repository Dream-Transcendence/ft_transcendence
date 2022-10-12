import { Link } from 'react-router-dom';
import { LinkComponentResource, LinkIconResource } from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';


function LinkPageComponentButton(props: { LinkComponentprops: LinkComponentResource }) {
    const { url, component } = props.LinkComponentprops;

    return (
        <Link style={{ textDecoration: 'none' }} to={url}>
            {component}
        </Link>
    );
}

export default LinkPageComponentButton;
