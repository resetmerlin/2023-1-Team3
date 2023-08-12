import React from 'react';
import { styled } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import {
  EmailInputChunk,
  DefaultInputChunk,
} from '../../../components/Input/InputChunk';

import {
  emailInput,
  passwordInput,
} from '../../../components/Input/InputsDefine';
import Button from '../../../components/atoms/button/InstanceMaker';

function LoginForm({ loginInfo, onSubmit, navigate }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();

  const goRegister = () => navigate('/register');

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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button nativeType="submit">로그인</Button>
        <Button type="tertiary" onClick={goRegister}>
          회원가입
        </Button>
      </div>
    </Form>
  );
}

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
