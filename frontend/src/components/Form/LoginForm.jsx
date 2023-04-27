import React from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { EmailInputChunk, DefaultInputChunk } from "../Input/InputChunk";
import { SubmitButton } from "../Button";
import { emailInput, passwordInput } from "../Input/InputsDefine";
const LoginForm = ({ loginInfo, onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInputChunk
        loginInfo={loginInfo}
        input={emailInput}
        register={register}
        errors={errors}
      />
      <DefaultInputChunk
        input={passwordInput}
        register={register}
        errors={errors}
      />

      <SubmitButton page={"login"} />
      <Link to="/register" className="form__wrap__link">
        Not a member yet?
      </Link>
    </form>
  );
};

export default LoginForm;
