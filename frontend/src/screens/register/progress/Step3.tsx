import React from 'react';
import { DefaultInputChunk } from '../../../components/Input/InputChunk';
import {
  passwordInput,
  secondPasswordInput,
} from '../../../components/Input/InputsDefine';
import { InputAndErrorWrap } from '../form/RegisterForm';
import Button from '../../../components/atoms/button/InstanceMaker';
const Step3 = ({
  errors,
  register,
  handleNext,
  getValuePassword,
  getValueSecond,
}) => {
  const inputErrors =
    errors?.[passwordInput?.name] || errors?.[secondPasswordInput?.name]
      ? true
      : false;

  const getValues = !getValuePassword || !getValueSecond ? false : true;

  const disabled = !getValues || inputErrors == true ? true : false;

  const buttonHandler = () => {
    if (!getValues || inputErrors === true) {
    } else {
      handleNext();
    }
  };
  return (
    <>
      <InputAndErrorWrap>
        <DefaultInputChunk
          input={passwordInput}
          errors={errors}
          register={register}
        />
      </InputAndErrorWrap>

      <InputAndErrorWrap>
        <DefaultInputChunk
          input={secondPasswordInput}
          errors={errors}
          register={register}
        />
      </InputAndErrorWrap>

      <Button
        onClick={buttonHandler}
        disabled={disabled}
        nativeType="submit"
        className="marginTop-m"
        size="xl"
      >
        다음
      </Button>
    </>
  );
};

export default Step3;
