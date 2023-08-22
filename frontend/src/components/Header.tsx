import React from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoMediumImg } from './atoms/logo/Logo';
import Button from './atoms/button/InstanceMaker';
import { IconChevronLeft } from './atoms/icon/IconChevron';
const Header = () => {
  const location = useLocation().pathname;
  return (
    <>
      {location == '/message' ? (
        <div className="header">
          <h1>Message</h1>
        </div>
      ) : location == '/save' ? (
        <div className="header">
          <h1>Save</h1>
        </div>
      ) : location == '/setting' ? (
        <div className="header">
          <h1>Setting</h1>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const HomeHeader = ({ navigate, style }) => {
  return (
    <HeaderLogoWrap style={style}>
      <HeaderButtonWrap>
        <Button
          size="xl"
          division="icon"
          type="tertiary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft />
        </Button>
      </HeaderButtonWrap>

      <Link to="/">
        <LogoMediumImg />
      </Link>
    </HeaderLogoWrap>
  );
};

export const SaveHeader = ({ navigate, style }) => {
  return (
    <SaveHeaderWrap style={style}>
      <HeaderButtonWrap>
        <Button
          size="xl"
          division="icon"
          type="tertiary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft />
        </Button>
      </HeaderButtonWrap>

      <div className="save-header__content">
        <span>Like</span>
      </div>
    </SaveHeaderWrap>
  );
};
export const MessageHeader = ({ navigate }) => {
  return (
    <MessageHeaderWrap>
      <HeaderButtonWrap>
        <Button
          size="xl"
          division="icon"
          type="tertiary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft />
        </Button>
      </HeaderButtonWrap>
      <span>Message</span>
    </MessageHeaderWrap>
  );
};
export const SettingHeader = ({ navigate, name }) => {
  return (
    <SettingHeaderWrap>
      <HeaderButtonWrap>
        <Button
          size="xl"
          division="icon"
          type="tertiary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconChevronLeft />
        </Button>
      </HeaderButtonWrap>
      <span>{name}</span>
    </SettingHeaderWrap>
  );
};

const HeaderWrap = styled.div`
  height: auto;
  display: flex;
  position: absolute;
  top: 3%;
  left: 3%;
`;
const SettingHeaderWrap = styled.div`
  height: 12vh;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  span {
    margin-top: 1rem;
    font-size: 1.7rem;
    font-weight: 600;
    color: black;
  }
`;
const MessageHeaderWrap = styled.div`
  height: 14vh;
  width: 100%;
  display: flex;
  background-color: rgb(128, 113, 252);
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    font-size: 2.5rem;
    font-weight: 600;
    position: absolute;
    color: white;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    position: absolute;
    left: 3%;
    top: 5%;
  }
`;
const HeaderLogoWrap = styled.div`
  height: 13vh;
  width: 100%;

  display: flex;
  margin: 0 2rem;
  position: relative;

  align-items: center;
  justify-content: center;
  a {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const HeaderButtonWrap = styled.div`
  position: absolute;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button {
    position: fixed;
    top: 4.5%;
    left: 3%;
  }
`;
const SaveHeaderWrap = styled.div`
  height: 10vh;
  width: auto;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  .save-header__content {
    position: absolute;
    height: 100%;
    width: 90%;
    display: flex;
    border-bottom: 1.9px solid rgb(128, 113, 252);
    align-items: center;
    justify-content: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  span {
    font-size: 1.8rem;
    font-weight: 600;
    position: absolute;
    top: 47%;
  }
`;

export default Header;
