import {
  InputEmailError,
  InputGenderError,
  DefaultInputError,
  InputCodeError,
  InputEmailRegisterError,
} from "./InputError";
import { DefaultInput, GenderInput } from "./Input";
export const HandleInputChunk = ({
  input,
  register,
  errors,
  page,
  emailInfo,
}) => {
  return (
    <>
      {input.id == "email" && page == "register" ? (
        <EmailRegisterInputChunk
          input={input}
          register={register}
          emailInfo={emailInfo}
          errors={errors}
        />
      ) : input.id == "email" && page == "login" ? (
        <EmailInputChunk input={input} register={register} errors={errors} />
      ) : input.id == "female" || input.id == "male" ? (
        <GenderInputChunk input={input} register={register} errors={errors} />
      ) : input.id == "code" ? (
        <CodeInputChunk input={input} register={register} errors={errors} />
      ) : (
        <DefaultInputChunk input={input} register={register} errors={errors} />
      )}
    </>
  );
};
export const DefaultInputChunk = ({ input, register, errors }) => {
  return (
    <>
      <DefaultInput input={input} register={register} errors={errors} />
      <DefaultInputError errors={errors} input={input} />
    </>
  );
};
export const CodeInputChunk = ({
  input,
  emailStatus,
  codeInfo,
  seconds,
  register,
  errors,
}) => {
  return (
    <>
      <DefaultInput input={input} register={register} errors={errors} />
      <InputCodeError
        emailStatus={emailStatus}
        codeLoading={codeInfo.loading}
        codeError={codeInfo.error}
        seconds={seconds}
      />
    </>
  );
};
export const EmailInputChunk = ({
  input,
  loginInfo,
  register,
  errors,
  emailInfo,
}) => {
  return (
    <>
      <DefaultInput input={input} register={register} errors={errors} />

      <InputEmailError
        input={input}
        errors={errors}
        loginInfo={loginInfo}
        emailInfo={emailInfo}
      />
    </>
  );
};
export const EmailRegisterInputChunk = ({
  input,
  register,
  errors,
  emailInfo,
}) => {
  return (
    <>
      <DefaultInput input={input} register={register} errors={errors} />

      <InputEmailRegisterError
        input={input}
        errors={errors}
        emailInfo={emailInfo}
      />
    </>
  );
};
export const GenderInputChunk = ({ input, errors, setValue, register }) => {
  return (
    <>
      <GenderInput input={input} setValue={setValue} register={register} />
      <InputGenderError errors={errors} />
    </>
  );
};
