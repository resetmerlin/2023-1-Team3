import React from "react";

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
          <VerifyButton getValues={getValues} sendEmailData={sendEmailData} />
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
      )}
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

export default Step1;
