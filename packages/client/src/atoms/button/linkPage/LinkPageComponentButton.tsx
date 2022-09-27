import { Link } from 'react-router-dom';
import { LinkComponentResource, LinkIconResource } from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';


function LinkPageComponentButton(props: { LinkComponentResource: LinkComponentResource }) {
    const { url, component } = props.LinkComponentResource;

    return (
        <Link style={{ textDecoration: 'none' }} to={url}>
            {component}
        </Link>
    );
}

export default LinkPageComponentButton;
