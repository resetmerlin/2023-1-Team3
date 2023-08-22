import { useFormContext } from 'react-hook-form';

import {
  passwordInput,
  currentPasswordInput,
  secondPasswordInput,
} from '../../../../components/Input/InputsDefine';
import { DefaultPasswordInput } from '../../../../components/Input/Input';
import {
  DefaultInputError,
  InputEmailError,
} from '../../../../components/Input/InputError';
import Button from '../../../../components/atoms/button/InstanceMaker';
import IconCheck from '../../../../components/atoms/icon/IconCheck';

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="check-button-wrap">
        <Button nativeType="submit" type="tertiary" division="icon">
          <IconCheck />
        </Button>
      </div>
    </form>
  );
};

export default SecurityPasswordForm;
