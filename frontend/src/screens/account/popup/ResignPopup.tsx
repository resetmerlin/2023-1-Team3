import React from 'react';
import { styled } from 'styled-components';
import Button from '../../../components/atoms/button/InstanceMaker';

const ResignPopup = () => {
  return (
    <SettingQuit className="setting-quit-popup">
      {' '}
      <SettingQuitWrap>
        <SettingQuitIconWrap>
          <box-icon name="trash" size="2rem" color="white"></box-icon>
        </SettingQuitIconWrap>

        <SettingQuitTitle>정말 탈퇴하시겠어요?</SettingQuitTitle>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SettingQuitParagraph>탈퇴 버튼 선택 시</SettingQuitParagraph>
          <SettingQuitParagraph>
            계정은 삭제되며 복구되지 않습니다.
          </SettingQuitParagraph>
        </div>
        <SettingQuitButtonWrap>
          <Button nativeType="submit" id="account-quit-button">
            탈퇴
          </Button>

          <SettingQuitLabel htmlFor="account-drop">취소</SettingQuitLabel>
        </SettingQuitButtonWrap>
      </SettingQuitWrap>
    </SettingQuit>
  );
};

const SettingQuit = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;
const SettingQuitWrap = styled.div`
  width: 18rem;
  height: 22rem;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-direction: column;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1.2rem;
  padding: 1rem;
`;

const SettingQuitIconWrap = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: #8071fc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 1rem 0 0.5rem 0;
`;
const SettingQuitTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;
const SettingQuitParagraph = styled.span`
  font-size: 1rem;
`;

const SettingQuitButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  #account-quit-button {
    color: white;
    background-color: #8071fc;
    border-radius: 0.4rem;
    font-weight: 500;
  }
`;

const SettingQuitLabel = styled.label`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default ResignPopup;
