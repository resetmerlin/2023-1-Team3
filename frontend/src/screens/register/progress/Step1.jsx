import React from "react";
import { Link } from "react-router-dom";

import {
  EmailNextStepButton,
  VerifyButton,
  VerifyCodeButton,
} from "../../../components/Button";
import { emailInput, codeInput } from "../../../components/Input/InputsDefine";
import { styled } from "styled-components";
import {
  InputCodeError,
  InputEmailRegisterError,
} from "../../../components/Input/InputError";
import { DefaultInput } from "../../../components/Input/Input";
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
          <VerifyButton
            getValues={getValues}
            sendEmailData={sendEmailData}
            emailInfo={emailInfo}
          />
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
              <VerifyCodeButton
                sendCodeData={sendCodeData}
                getValueEmail={getValueEmail}
                getValueCode={getValueCode}
                codeInfo={codeInfo}
              />
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
      )}{" "}
      <LinkWrap>
        <Link to="https://portal.dankook.ac.kr/web/portal" target={"_blank"}>
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
      <EmailNextStepButton
        handleNext={handleNext}
        codeInfo={codeInfo}
        emailInfo={emailInfo}
      />
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
