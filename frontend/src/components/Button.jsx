import styled from 'styled-components';
import React, { memo } from 'react';
import { BoxIconElement } from 'boxicons';
import { ButtonLoading } from './Loader';
import { ButtonChecked } from './Checked';
import LikeAnimation from './Animation/Like/LikeAnimation';

/**저장 버튼: 개인정보 재설정 저장용*/
export const SaveButton = ({ loading, status }) => {
  const saveButtonStyle = {
    backgroundColor: status && !loading ? 'rgb(128, 113, 252)' : 'white',
    color:
      status && loading === false
        ? 'white'
        : loading === undefined && status === undefined
        ? 'rgb(128, 113, 252)'
        : 'rgb(128, 113, 252)',
  };
  return (
    <PersonalInfoButton type='submit' style={saveButtonStyle}>
      {status && loading === false
        ? '저장 완료!'
        : loading === undefined && status === undefined
        ? '저장'
        : '저장'}
    </PersonalInfoButton>
  );
};

/**프로필 변경 버튼: 개인정보 재설정 저장용*/
export const ChangeProfileButton = ({ handleChangeProfile }) => {
  return (
    <PersonalInfoButton
      style={{
        width: '5.5rem',
      }}
      onClick={(event) => {
        event.preventDefault();

        handleChangeProfile();
      }}
    >
      프로필 변경
    </PersonalInfoButton>
  );
};

//**프로필 변경 버튼: 개인정보 재설정 저장용*/
export const SaveProfileButton = () => {
  return (
    <PersonalInfoButton
      type='submit'
      style={{
        width: '5.5rem',
      }}
    >
      프로필 저장
    </PersonalInfoButton>
  );
};

/**체크 버튼: 현재 비밀번호 재설정으로 사용 */
export const CheckedButton = () => {
  return (
    <button
      type='submit'
      style={{
        position: 'fixed',
        top: '4.5%',
        right: '3%',
        backgroundColor: 'white',
        border: 'none',
      }}
    >
      <box-icon name='check' size='2rem'></box-icon>
    </button>
  );
};

/**로그아웃 전용 버튼 */
export const LogoutButton = ({ logout }) => {
  return (
    <SettingButton
      type='button'
      className='setting__button'
      onClick={() => {
        logout();
      }}
    >
      계정에서 로그아웃
    </SettingButton>
  );
};
export const RegisterButton = ({ registerInfo }) => {
  const submitButtonStyle = {
    backgroundColor: 'rgb(128, 113, 252)',
    width: '100%',

    height: ' 3.3rem',
  };
  return (
    <DefaultFormButtom type='submit' style={submitButtonStyle}>
      {registerInfo?.loading === true ? (
        <ButtonLoading />
      ) : registerInfo?.loading === false && registerInfo?.registerStatus ? (
        <ButtonChecked />
      ) : (
        '회원가입'
      )}
    </DefaultFormButtom>
  );
};
export const SubmitButton = ({ page }) => {
  const submitButtonStyle = {
    backgroundColor: 'rgb(128, 113, 252)',
    width: page == 'register' ? '100%' : '47.5%',

    height: page == 'register' ? ' 3.3rem' : '2.5rem',
  };
  return (
    <DefaultFormButtom type='submit' style={submitButtonStyle}>
      {page == 'login' ? '로그인 ' : '회원가입'}
    </DefaultFormButtom>
  );
};
export const GoToRegisterButton = ({ page, navigate }) => {
  return (
    <DefaultFormButtom
      type='button'
      style={{ backgroundColor: '#B1B1B1' }}
      onClick={() => {
        if (page) navigate(`/${page}`);
      }}
    >
      {page == 'login' ? '로그인 ' : '회원가입'}{' '}
    </DefaultFormButtom>
  );
};

/** 이메일 인증 버튼 */
export const VerifyButton = ({ sendEmailData, getValues, emailInfo }) => {
  return (
    <VerifyStyleButton
      type='submit'
      onClick={() => {
        sendEmailData(getValues('email'));
      }}
    >
      {!emailInfo?.error && emailInfo?.emailStatus === false ? (
        <ButtonLoading />
      ) : emailInfo?.loading === false &&
        !emailInfo?.error &&
        emailInfo?.emailStatus ? (
        <ButtonChecked />
      ) : (
        '전송'
      )}
    </VerifyStyleButton>
  );
};

/** 이메일 코드 인증 버튼 */
export const VerifyCodeButton = ({
  sendCodeData,
  getValueEmail,
  codeInfo,
  getValueCode,
}) => {
  return (
    <VerifyStyleButton
      onClick={() => {
        sendCodeData(getValueEmail, getValueCode);
      }}
      type='button'
    >
      {!codeInfo?.error && codeInfo?.codeBoolean === false ? (
        <ButtonLoading />
      ) : codeInfo?.loading === false &&
        !codeInfo?.error &&
        codeInfo?.codeBoolean ? (
        <ButtonChecked />
      ) : (
        '인증'
      )}
    </VerifyStyleButton>
  );
};

/** 뒤로 가기 버튼 */
export const BackButton = memo(function BackButton({ navigate }) {
  return (
    <BackArrowButton
      onClick={() => {
        navigate(-1);
      }}
    >
      <box-icon name='chevron-left' color='black' size='2.5rem'></box-icon>
    </BackArrowButton>
  );
});
/** 뒤로 가기 버튼 */
export const HeaderBackButton = memo(function BackButton({ navigate }) {
  return (
    <BackArrowButton
      style={{
        position: 'fixed',
        top: '4.5%',
        left: '3%',
      }}
      onClick={() => {
        navigate(-1);
      }}
    >
      <box-icon name='chevron-left' color='black' size='2.5rem'></box-icon>
    </BackArrowButton>
  );
});

/*회입가입 스테이지 뒤로 가기 버튼 */
export const BackFormButton = memo(function BackFormButton({ handlePrevious }) {
  return (
    <BackArrowButton onClick={handlePrevious} style={{ top: '3%', left: '3%' }}>
      <box-icon name='chevron-left' color='black' size='3rem'></box-icon>
    </BackArrowButton>
  );
});

/*유저 디테일 팡업 상태에서 홈 슬라이드로 돌아가는 버튼 */
export const BackToSlideCardButton = memo(function BackFormButton({
  goBackToSlide,
}) {
  return (
    <button
      onClick={goBackToSlide}
      style={{
        position: 'absolute',
        background: 'transparent',
        border: 'none',

        top: '1%',
        right: '2%',
        zIndex: 1000,
      }}
    >
      <box-icon name='x' color='black' size='3rem'></box-icon>{' '}
    </button>
  );
});

export const SaveCheckButton = ({ sendImageToServer }) => {
  return (
    <button onClick={sendImageToServer}>
      <box-icon
        name='check'
        color='rgb(196, 196, 196)'
        size='2.3rem'
      ></box-icon>
    </button>
  );
};

/** 회원가입 후 프로필 이미지 업로드 버튼 */
export const ImageRegisterButton = ({
  handleNext,
  sendImageToServer,
  content,
}) => {
  return (
    <NextButtonWrap>
      <NextButton
        type='button'
        onClick={async () => {
          handleNext();
          await sendImageToServer();
        }}
      >
        {content}
      </NextButton>
    </NextButtonWrap>
  );
};

/** 회원가입 후 프로필 이미지 업로드 버튼 */
export const ImageUploadButton = ({ sendImageToServer, info }) => {
  return (
    <NextButtonWrap>
      <NextButton
        type='button'
        onClick={async () => {
          await sendImageToServer();
        }}
      >
        {info?.loading === true ? (
          <ButtonLoading />
        ) : info?.loading === false && info?.profileEditStatus ? (
          <ButtonChecked />
        ) : (
          '프로필 이미지로 설정'
        )}
      </NextButton>
    </NextButtonWrap>
  );
};
/** 회원가입 후 로그인으로 돌아가는 버튼 */
export const AfterRegisterButton = ({ content, navigate }) => {
  return (
    <NextButtonWrap>
      <NextButton
        type='button'
        onClick={() => {
          navigate(`/login`);
        }}
      >
        {content}
      </NextButton>
    </NextButtonWrap>
  );
};

/** 이메일 및 코드 인증 단계 외 다음 버튼 */
export const NextStepButton = ({ handleNext, inputErrors, getValues }) => {
  return (
    <NextButtonWrap>
      <NextButton
        type='submit'
        disabled={!getValues || inputErrors == true ? true : false}
        onClick={() => {
          if (!getValues || inputErrors == true) {
          } else {
            handleNext();
          }
        }}
      >
        다음
      </NextButton>
    </NextButtonWrap>
  );
};
/** 이메일 및 코드 인증 단계 다음 버튼 */
export const EmailNextStepButton = ({ handleNext, codeInfo, emailInfo }) => {
  return (
    <NextButtonWrap>
      <NextButton
        type='submit'
        onClick={() => {
          if (
            !emailInfo?.loading &&
            emailInfo?.emailStatus &&
            codeInfo?.codeBoolean == true &&
            !codeInfo?.loading
          )
            handleNext();
        }}
      >
        다음
      </NextButton>
    </NextButtonWrap>
  );
};
export const PreviousStepButton = memo(function PreviousStepButton({
  handlePrevious,
}) {
  return (
    <NextButton
      className='page-handler-button'
      onClick={() => {
        handlePrevious();
      }}
    >
      previous page
    </NextButton>
  );
});

/** 다음 유저 슬라이드로 가는 삭제 버튼 */
export const UserDeleteButton = memo(function UserDeleteButton({
  goNextSlideHandler,
}) {
  return (
    <SmallUserButton type='button' onClick={goNextSlideHandler}>
      <box-icon name='x' color='rgb(128, 113, 252)' size='2.5rem'></box-icon>
    </SmallUserButton>
  );
});

/** 이미 다 본 유저 다시보는 버튼 */
export const RecapUserListsButton = memo(function UserDeleteButton({
  getPeopleList,
}) {
  return (
    <SmallNextButton>
      <NextButton
        style={{
          fontSize: '1rem',
          fontWeight: '800',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        type='button'
        onClick={() => {
          getPeopleList();
        }}
      >
        유저 다시보기
        <box-icon name='chevron-right' color='white' size='2rem'></box-icon>
      </NextButton>
    </SmallNextButton>
  );
});

export const UserMessageButton = memo(function UserMessageButton({
  startMessage,
}) {
  return (
    <SmallUserButton type='button' onClick={startMessage}>
      <box-icon
        color='rgb(128, 113, 252)'
        name='message-rounded'
        size='2rem'
        type='solid'
      ></box-icon>
    </SmallUserButton>
  );
});
export const UserDetailsMessageButton = memo(
  function UserDetailsMessageButton() {
    return (
      <UserDetailButton
        type='button'
        style={{
          backgroundColor: '#868E96',
          color: 'white',
        }}
      >
        <box-icon
          color='white'
          name='message-rounded'
          size='2rem'
          type='solid'
          style={{
            marginRight: '1rem',
          }}
        ></box-icon>
        메세지 보내기
      </UserDetailButton>
    );
  }
);

/** 유저 좋아요 버튼 */
export const UserLikeButton = memo(function UserLikeButton({
  saveValue,
  likeAction,
}) {
  return (
    <>
      <MediumUserButton
        type='button'
        style={{
          position: 'relative',
          transition: 'all 0.1s ease-in-out',
        }}
        onClick={likeAction}
      >
        {saveValue && <LikeAnimation />}

        {saveValue == false ? (
          <box-icon
            color='rgb(128, 113, 252)'
            name='heart'
            size='2rem'
            type='solid'
          ></box-icon>
        ) : saveValue == true ? (
          <box-icon
            color='rgb(128, 113, 252)'
            name='heart'
            size='2.5rem'
            type='solid'
          ></box-icon>
        ) : (
          <box-icon
            color='rgb(128, 113, 252)'
            name='heart'
            size='2rem'
            type='solid'
          ></box-icon>
        )}
      </MediumUserButton>
    </>
  );
});

/** 유저 삭제 버튼 */
export const BlockButton = memo(function BlockButton({
  blockValue,
  blockAction,
}) {
  return (
    <PopupButton
      type='button'
      style={{
        color: blockValue ? 'rgb(128, 113, 252)' : 'black',
        fontWeight: blockValue ? '600' : '400',

        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      }}
      onClick={blockAction}
    >
      삭제하기
    </PopupButton>
  );
});
/** 유저 팝업 디테일 좋아요 버튼 */
export const UserDetailLikeButton = memo(function UserDetailLikeButton({
  saveValue,
  likeAction,
}) {
  return (
    <UserDetailButton
      style={{
        backgroundColor: !saveValue ? 'white' : 'rgb(128, 113, 252)',
        color: !saveValue ? 'rgb(128, 113, 252)' : 'white',
      }}
      onClick={likeAction}
    >
      {saveValue == false ? (
        <>
          <box-icon
            color='rgb(128, 113, 252)'
            name='heart'
            size='2.2rem'
            style={{
              marginRight: '1rem',
            }}
            type='solid'
          ></box-icon>
          Like에 저장
        </>
      ) : saveValue == true ? (
        <>
          <box-icon
            color='white'
            name='heart'
            size='2.2rem'
            type='solid'
            style={{
              marginRight: '1rem',
            }}
          ></box-icon>
          Like에서 삭제
        </>
      ) : (
        <>
          <box-icon
            color='rgb(128, 113, 252)'
            name='heart'
            size='2.2rem'
            style={{
              marginRight: '1rem',
            }}
            type='solid'
          ></box-icon>
          Like에 저장
        </>
      )}

      {}
    </UserDetailButton>
  );
});

export const FullStepButton = memo(function FullStepButton({
  handlePrevious,
  handleNext,
}) {
  return (
    <PageButtonWrap>
      <PreviousStepButton handlePrevious={handlePrevious} />

      <NextStepButton handleNext={handleNext} />
    </PageButtonWrap>
  );
});

/** 로그인 혹은 회원가입 화면으로 가는 버튼 */
export const GoFormButton = ({ page, navigate }) => {
  return (
    <>
      <NextButtonWrap style={{ height: '1rem' }}>
        <GoAnotherForm
          type='button'
          onClick={() => {
            if (page) navigate(`/${page}`);
          }}
        >
          {page == 'login' ? '이미 가입을 하셨나요? ' : '계정이 없나요?'}{' '}
        </GoAnotherForm>
      </NextButtonWrap>
    </>
  );
};

const SettingButton = styled.button`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1.4rem;
  font-size: 0.95rem;
  background-color: white;
  border: none;
  border-radius: 8px;
  align-self: center;
  color: black;
  cursor: pointer;
`;
const PopupButton = styled.button`
  width: 100%;
  height: 50%;
  cursor: pointer;
`;
const UserDetailButton = styled.div`
  background-color: white;
  width: 40%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  height: 3rem;
  border: 1.5px solid rgb(128, 113, 252);
  color: rgb(128, 113, 252);
  transition: all 0.2s ease-in-out;

  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;
const SmallNextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.3rem;
  width: 45%;
  cursor: pointer;
`;
const GoAnotherForm = styled.button`
  height: 2rem;
  color: rgb(128, 113, 252);
  background-color: white;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
`;
const SmallUserButton = styled.button`
  background-color: white;

  width: auto;
  height: auto;
  cursor: pointer;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
`;
const PageButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;
  width: 100%;
  margin-top: 2rem;
  cursor: pointer;
`;
const NextButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.3rem;
  width: 100%;
  margin-top: 2rem;
  cursor: pointer;
`;

const NextButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: rgb(128, 113, 252);
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: 5px;
  cursor: pointer;
`;
const BackArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  cursor: pointer;

  // top: 3%;
  // left: 3%;
`;
const DefaultFormButtom = styled.button`
  width: 47.5%;
  height: 2.5rem;
  border: none;
  font-weight: 600;
  border-radius: 5px;
  font-size: 1.2rem;
  color: white;
  margin: 2.2rem 0;
  cursor: pointer;
`;

const VerifyStyleButton = styled.button`
  width: 6rem;
  height: 3rem;
  border: none;
  font-weight: 600;
  border-radius: 5px;
  font-size: 1.1rem;
  color: white;
  margin: 0.5rem;
  background-color: rgb(128, 113, 252);
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MediumUserButton = styled.button`
  background-color: white;
  border-radius: 50%;
  width: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border: none;
  cursor: pointer;
`;

const PersonalInfoButton = styled.button`
  min-width: 4.6rem;
  padding: 0.3rem;
  height: 2.1rem;
  background-color: white;
  border-radius: 7px;
  font-size: 1rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  color: rgb(128, 113, 252);
  font-weight: 700;
`;
