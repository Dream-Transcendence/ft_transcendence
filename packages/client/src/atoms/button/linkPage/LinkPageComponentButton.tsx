import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { gameTypeAtom } from '../../../recoil/user.recoil';
import {
  LinkComponentResource,
  LinkIconResource,
} from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';

function LinkPageComponentButton(props: {
  linkComponentprops: LinkComponentResource;
}) {
  const { url, component } = props.linkComponentprops;
  // const [gameType, setGameType] = useRecoilState(gameTypeAtom);
  // console.log('gameType', gameType);

  return (
    <Link style={{ textDecoration: 'none' }} to={url}>
      {component}
    </Link>
  );
}

export default LinkPageComponentButton;
