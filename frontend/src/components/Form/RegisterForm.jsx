import React from "react";

import { Link } from "react-router-dom";

import {
  codeInput,
  emailInput,
  nameInput,
  passwordInput,
  secondPasswordInput,
  femaleInput,
  maleInput,
  birthdayInput,
} from "../Input/InputsDefine";

import { useFormContext } from "react-hook-form";
import {
  CodeInputChunk,
  DefaultInputChunk,
  EmailRegisterInputChunk,
  GenderInputChunk,
} from "../Input/InputChunk";
import { SubmitButton, VerifyButton, VerifyCodeButton } from "../Button";
import { RegisterError } from "../Input/InputError";
const RegisterForm = ({
  onSubmit,
  emailInfo,
  registerInfo,
  sendEmailData,
  sendCodeData,
  seconds,
  codeInfo,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/** 이메일 입력 핸들러*/}
      <div className="form-input-wrap form-input-email__wrap">
        <EmailRegisterInputChunk
          input={emailInput}
          errors={errors}
          register={register}
          emailInfo={emailInfo}
        />

        {!errors?.email && (
          <VerifyButton
            getValues={getValues(emailInput.name)}
            sendEmailData={sendEmailData}
          />
        )}
      </div>

      {/** 이메일 인증코드 handler*/}
      {/** submit 버튼 핸들러*/}
      {emailInfo?.emailStatus && !errors.email && (
        <div className="form-input-wrap form-input-email__wrap ">
          <CodeInputChunk
            input={codeInput}
            errors={errors}
            register={register}
            seconds={seconds}
            codeInfo={codeInfo}
            emailStatus={emailInfo.emailStatus}
          />

          {!emailInfo?.emailLoading && !emailInfo?.emailError && (
            <VerifyCodeButton
              sendCodeData={sendCodeData}
              getValueEmail={getValues("email")}
              getValueCode={getValues("code")}
            />
          )}
        </div>
      )}

      <DefaultInputChunk
        input={nameInput}
        errors={errors}
        register={register}
      />
      <DefaultInputChunk
        input={passwordInput}
        errors={errors}
        register={register}
      />
      <DefaultInputChunk
        input={secondPasswordInput}
        errors={errors}
        register={register}
      />

      <span className="form-span">성별을 고르세요</span>
      <div className="form__checkbox-wrap">
        <GenderInputChunk
          input={femaleInput}
          errors={errors}
          setValue={setValue}
          register={register}
        />
        <GenderInputChunk
          input={maleInput}
          errors={errors}
          setValue={setValue}
          register={register}
        />
      </div>

      <DefaultInputChunk
        input={birthdayInput}
        errors={errors}
        register={register}
      />

      <SubmitButton page={"회원가입"} />

      <RegisterError
        registerError={registerInfo?.error}
        registerLoading={registerInfo?.loading}
      />

      <div className="form__link__wrap">
        <Link to="/login" className="form__wrap__link">
          Have an Account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
