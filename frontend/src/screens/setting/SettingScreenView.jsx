import React from 'react';
import { styled } from 'styled-components';
import { getImageSrc } from '../../func/commonLogicHelper';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../components/Button';

const SettingScreenView = ({
  profileProps,
  introductionProps,
  accountProps,
}) => {
  return (
    <>
      <SettingUserProfile {...profileProps} />
      <SettingUserIntroduction {...introductionProps} />
      <SettingUserEdit />
      <SettingUserAccount {...accountProps} />
    </>
  );
};

const SettingUserProfile = ({
  memberId,
  name,
  imgSrc,
  department,
  age,
  getPopupStateFromChild,
}) => {
  return (
    <SettingUserContent htmlFor='my-card'>
      <SettingUserImage
        key={memberId}
        src={imgSrc}
        loading='lazy'
        alt='mypage-profile'
      ></SettingUserImage>
      <input
        type='checkbox'
        onChange={getPopupStateFromChild}
        id='my-card'
        style={{ display: 'none' }}
      />
      <SettingUserTextWrap>
        <span style={{ fontSize: '1.4rem' }}>
          <SettingUserName>{name}</SettingUserName>
          {age}
        </span>

        <span style={{ fontSize: '.9rem' }}>{department}</span>
      </SettingUserTextWrap>
    </SettingUserContent>
  );
};

const SettingUserIntroduction = ({ introduction }) => {
  return (
    <SettingMiddlContent>
      <span>자기소개</span>
      <p>{introduction}</p>
    </SettingMiddlContent>
  );
};

const SettingUserEdit = () => {
  return (
    <SettingAccountContent>
      <Link to='/setting/personal-info'>프로필 설정</Link>

      <Link to='/setting/account-security'>계정보안 설정</Link>
      <Link>문의</Link>
    </SettingAccountContent>
  );
};

const SettingUserAccount = ({ logoutHandler }) => {
  return (
    <SettingLastContent>
      <LogoutButton logout={logoutHandler} />
      <Link
        to='/setting/account-management'
        className='setting__button'
        style={{ color: 'red', textDecoration: 'none' }}
      >
        계정에서 탈퇴
      </Link>
    </SettingLastContent>
  );
};

const SettingUserName = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const SettingUserContent = styled.label`
  height: 12.5%;
  width: 88%;
  border-radius: 8px;
  display: flex;
  box-shadow: 0px 8px 15px 5px rgb(236, 234, 247, 1);
  align-self: center;
  padding: 1rem;
`;

const SettingUserTextWrap = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 1rem;

  span {
    margin-bottom: 0.5rem;
  }
`;
const SettingUserImage = styled.img`
  height: 4.8rem;
  width: 4.8rem;
  border-radius: 8px;
  display: flex;
  align-self: center;
  object-fit: cover;
`;

const SettingMiddlContent = styled.div`
  height: 27.5%;
  width: 88%;
  border-radius: 8px;
  margin: 1.2rem 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;
  span {
    font-size: 1rem;
    font-weight: 800;
    color: #8071fc;
    margin-bottom: 0.8rem;
  }
  p {
    color: black;
  }
`;

const SettingAccountContent = styled.div`
  height: 16%;
  justify-content: center;
  width: 88%;
  border-radius: 8px;
  margin: 0 0 1.2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;

  a {
    height: 25%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.4rem;
    color: black;

    text-decoration: none;
    font-size: 1.1rem;
    background-color: white;
    border: none;
    border-radius: 8px;
    align-self: center;
  }
`;

const SettingLastContent = styled.div`
  height: 12%;
  width: 88%;
  border-radius: 8px;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 15px 7px rgb(236, 234, 247, 1);
  align-self: center;

  .setting__button {
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1.4rem;
    font-size: 1rem;
    background-color: white;
    border: none;
    border-radius: 8px;
    align-self: center;
    color: black;
  }
`;

export default SettingScreenView;
