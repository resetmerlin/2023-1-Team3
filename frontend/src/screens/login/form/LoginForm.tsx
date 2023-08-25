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
import { styled } from 'styled-components';
function LoginForm({ loginInfo, onSubmit, goRegisterPage }) {
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
      <div className="button-wrap">
        <Button nativeType="submit">로그인</Button>
        <Button type="tertiary" onClick={goRegisterPage}>
          회원가입
        </Button>
      </div>
    </form>
  );
}
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export default LoginForm;
