import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { BoxIconElement } from 'boxicons';

const Footer = memo(function Footer({ style }) {
  const location = useLocation().pathname;

  return (
    <>
      {location == '/register' ? (
        <></>
      ) : location == '/login' ? (
        <></>
      ) : (
        <FooterContent style={style}>
          <Link to='/' className='footer__link--home'>
            {location == '/' ? (
              <box-icon
                name='home-alt-2'
                color='rgb(128, 113, 252)'
                size='1.9rem'
                type='solid'
              ></box-icon>
            ) : (
              <box-icon
                name='home-alt-2'
                color='rgb(198 200 205)'
                size='1.9rem'
                type='solid'
              ></box-icon>
            )}
          </Link>

          <Link to='/save' className='footer__link--heart'>
            {location == '/save' ? (
              <box-icon
                color='rgb(128, 113, 252)'
                name='heart'
                size='1.9rem'
                type='solid'
              ></box-icon>
            ) : (
              <box-icon
                color='rgb(198 200 205)'
                name='heart'
                size='1.9rem'
                type='solid'
              ></box-icon>
            )}
          </Link>
          <Link to='/message' className='footer__link--message'>
            {location == '/message' ? (
              <box-icon
                color='rgb(128, 113, 252)'
                name='message-rounded'
                size='1.9rem'
                type='solid'
              ></box-icon>
            ) : (
              <box-icon
                color='rgb(198 200 205)'
                name='message-rounded'
                size='1.9rem'
                type='solid'
              ></box-icon>
            )}
          </Link>
          <Link to='/setting' className='footer__link--setting'>
            {location == '/setting' ? (
              <box-icon
                type='solid'
                color='rgb(128, 113, 252)'
                size='1.9rem'
                name='user'
              ></box-icon>
            ) : (
              <box-icon
                color='rgb(198 200 205)'
                name='user'
                size='1.9rem'
                type='solid'
              ></box-icon>
            )}
          </Link>
        </FooterContent>
      )}
    </>
  );
});

const FooterContent = styled.div`
  bottom: 0;
  height: 10vh;
  width: 100%;
  border-top: none;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  background-color: white;
  font-size: 2rem;
  position: absolute;
  box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 17px 6px rgb(236, 234, 247, 1);
`;

export default Footer;
