import React from "react";
import { useFormContext } from "react-hook-form";
import {
  EmailInputChunk,
  DefaultInputChunk,
} from "../../../components/Input/InputChunk";
import { GoToRegisterButton, SubmitButton } from "../../../components/Button";
import {
  emailInput,
  passwordInput,
} from "../../../components/Input/InputsDefine";
import { styled } from "styled-components";
const LoginForm = ({ loginInfo, onSubmit, navigate }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonWrap>
        <SubmitButton page={"login"} />

        <GoToRegisterButton page={"register "} navigate={navigate} />
      </ButtonWrap>
    </Form>
  );
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrap = styled.div`
display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
`;

export default LoginForm;
