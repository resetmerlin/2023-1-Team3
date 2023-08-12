import React from 'react';
import { DefaultInputChunk } from '../../../components/Input/InputChunk';
import {
  nameInput,
  birthdayInput,
} from '../../../components/Input/InputsDefine';
import { InputAndErrorWrap } from '../form/RegisterForm';
import { NextStepButton } from '../../../components/atoms/button/Button';

const Step2 = ({
  errors,
  register,
  handleNext,
  getValueName,
  getValueBirth,
}) => {
  return (
    <>
      <InputAndErrorWrap>
        <DefaultInputChunk
          input={nameInput}
          errors={errors}
          register={register}
        />
      </InputAndErrorWrap>

      <InputAndErrorWrap>
        <DefaultInputChunk
          input={birthdayInput}
          errors={errors}
          register={register}
        />
      </InputAndErrorWrap>

      <NextStepButton
        getValues={!getValueBirth || !getValueName ? false : true}
        handleNext={handleNext}
        inputErrors={
          errors?.[nameInput?.name] || errors?.[birthdayInput?.name]
            ? true
            : false
        }
      />
    </>
  );
};

export default Step2;
