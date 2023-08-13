import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  passwordInput,
  currentPasswordInput,
  secondPasswordInput,
} from '../../../../components/Input/InputsDefine';
import { Form } from '../../../login/form/LoginForm';
import {
  DefaultInput,
  DefaultPasswordInput,
} from '../../../../components/Input/Input';
import {
  DefaultInputError,
  InputEmailError,
} from '../../../../components/Input/InputError';
import { CheckedButton } from '../../../../components/atoms/button/Button';

const SecurityPasswordForm = ({ onSubmit, error, loading }) => {
  const passwordEditInfo = {
    error,
    loading,
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '100%',
        height: 'rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DefaultPasswordInput
        input={currentPasswordInput}
        register={register}
        errors={errors}
        info={passwordEditInfo}
      />

      <InputEmailError
        errors={errors}
        input={currentPasswordInput}
        loginInfo={passwordEditInfo}
      />

      <DefaultPasswordInput
        input={passwordInput}
        register={register}
        errors={errors}
      />

      <DefaultInputError errors={errors} input={passwordInput} />

      <DefaultPasswordInput
        input={secondPasswordInput}
        register={register}
        errors={errors}
      />
      <DefaultInputError errors={errors} input={secondPasswordInput} />
      <CheckedButton />
    </form>
  );
};

export default SecurityPasswordForm;
