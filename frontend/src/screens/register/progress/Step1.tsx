import React from 'react';
import { Link } from 'react-router-dom';
import { emailInput, codeInput } from '../../../components/Input/InputsDefine';
import { styled } from 'styled-components';
import {
  InputCodeError,
  InputEmailRegisterError,
} from '../../../components/Input/InputError';
import { DefaultInput } from '../../../components/Input/Input';
import Button from '../../../components/atoms/button/InstanceMaker';
import { ButtonLoading } from '../../../components/Loader';
import { ButtonChecked } from '../../../components/Checked';

const Step1 = ({
  errors,
  register,
  emailInfo,
  getValues,
  sendEmailData,
  codeInfo,
  seconds,
  handleNext,
  sendCodeData,

  getValueEmail,
  getValueCode,
}) => {
  const getEmailValue = () => sendEmailData(getValues('email'));

  const getVerified = () => {
    sendCodeData(getValueEmail, getValueCode);
  };

  const emailNextButton = () => {
    if (
      !emailInfo?.loading &&
      emailInfo?.emailStatus &&
      codeInfo?.codeBoolean == true &&
      !codeInfo?.loading
    )
      handleNext();
  };

  return (
    <>
      <EmailWrap>
        <DefaultInput
          input={emailInput}
          errors={errors}
          register={register}
          emailInfo={emailInfo}
        />
        {!errors?.email && (
          <Button nativeType="submit" size="m" onClick={getEmailValue}>
            {!emailInfo?.error && emailInfo?.emailStatus === false ? (
              <ButtonLoading />
            ) : emailInfo?.loading === false &&
              !emailInfo?.error &&
              emailInfo?.emailStatus ? (
              <ButtonChecked />
            ) : (
              '전송'
            )}
          </Button>
        )}
      </EmailWrap>
      <InputEmailRegisterError
        input={emailInput}
        errors={errors}
        emailInfo={emailInfo}
      />
      {emailInfo?.emailStatus && !errors.email && (
        <>
          <EmailWrap>
            <DefaultInput
              emailInfo={emailInfo}
              input={codeInput}
              errors={errors}
              register={register}
              codeInfo={codeInfo}
            />

            {!emailInfo?.emailLoading && !emailInfo?.emailError && (
              <Button size="m" onClick={getVerified}>
                {!codeInfo?.error && codeInfo?.codeBoolean === false ? (
                  <ButtonLoading />
                ) : codeInfo?.loading === false &&
                  !codeInfo?.error &&
                  codeInfo?.codeBoolean ? (
                  <ButtonChecked />
                ) : (
                  '인증'
                )}
              </Button>
            )}
          </EmailWrap>
          <InputCodeError
            emailStatus={emailInfo.emailStatus}
            codeLoading={codeInfo.loading}
            codeError={codeInfo.error}
            codeBoolean={codeInfo.codeBoolean}
            seconds={seconds}
          />
        </>
      )}{' '}
      <LinkWrap>
        <Link to="https://portal.dankook.ac.kr/web/portal" target={'_blank'}>
          포털 바로가기
          <box-icon
            name="chevron-left"
            type="solid"
            rotate="180"
            color=" #3d8fff"
            size="1.1rem"
          ></box-icon>
        </Link>
      </LinkWrap>
      <Button nativeType="submit" size="xl" onClick={emailNextButton}>
        다음
      </Button>
    </>
  );
};

const EmailWrap = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const LinkWrap = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  a {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;
    font-weight: 800;
    color: #3d8fff;
    font-size: 1rem;
  }
`;

export default Step1;
