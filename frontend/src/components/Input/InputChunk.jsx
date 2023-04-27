import {
  InputEmailError,
  InputGenderError,
  DefaultInputError,
  InputCodeError,
  InputEmailRegisterError,
} from "./InputError";
import { CodeInput, DefaultInput, GenderInput } from "./Input";

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
      <CodeInput input={input} register={register} errors={errors} />
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
