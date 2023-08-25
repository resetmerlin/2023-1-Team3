/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';
import './Footer.scss';
import { IconHeartSolid } from '../icon/IconHeart';
import IconHomeSolid from '../icon/IconHome';
import IconUser from '../icon/IconUser';
import IconMessageSolid from '../icon/IconMessage';

interface IProps {
  page?: 'home' | 'save' | 'message' | 'setting';
  className?: '';
  popup?: true | false;
}

export default function Footer({
  page = 'home',
  className = '',
  popup = false,
  ...props
}: IProps) {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={`${page}-footer ${className} ${!popup}-footer footer`}
    >
      <Link to="/">
        <IconHomeSolid
          color="rgb(198 200 205)"
          size="2.3rem"
          id="home__footer__icon"
        />
      </Link>

      <Link to="/save">
        <IconHeartSolid
          color="rgb(198 200 205)"
          size="2.3rem"
          id="save__footer__icon"
        />
      </Link>
      <Link to="/message">
        <IconMessageSolid
          color="rgb(198 200 205)"
          size="2.3rem"
          id="message__footer__icon"
        />
      </Link>
      <Link to="/setting">
        <IconUser
          color="rgb(198 200 205)"
          size="2.3rem"
          id="setting__footer__icon"
        />
      </Link>
    </div>
  );
}
