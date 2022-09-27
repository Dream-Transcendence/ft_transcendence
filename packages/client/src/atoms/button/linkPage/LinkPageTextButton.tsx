import { FC } from 'react';
import { Link } from 'react-router-dom';
import { LinkTextResource } from '../../../types/Link.type';
import CustomIconButton from '../icon/CustomIconButtion';
import TextButton from '../text/TextButton';

function LinkPageTextButton(props: { LinkTextResource: LinkTextResource }) {
  const { url, content } = props.LinkTextResource;

  return (
    <Link style={{ textDecoration: 'none' }} to={url}>
      <TextButton content={content} />
    </Link>
  );
}

export default LinkPageTextButton;
