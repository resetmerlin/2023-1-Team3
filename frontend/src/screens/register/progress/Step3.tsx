import React from 'react';
import { DefaultInputChunk } from '../../../components/Input/InputChunk';
import {
  passwordInput,
  secondPasswordInput,
} from '../../../components/Input/InputsDefine';
import { InputAndErrorWrap } from '../form/RegisterForm';
import { NextStepButton } from '../../../components/atoms/button/Button';
const Step3 = ({
  errors,
  register,
  handleNext,
  getValuePassword,
  getValueSecond,
}) => {
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
      <NextStepButton
        handleNext={handleNext}
        getValues={!getValuePassword || !getValueSecond ? false : true}
        inputErrors={
          errors?.[passwordInput?.name] || errors?.[secondPasswordInput?.name]
            ? true
            : false
        }
      />
    </>
  );
};

export default Step3;
