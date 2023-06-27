import React from "react";
import { femaleInput, maleInput } from "../../../components/Input/InputsDefine";
import { NextStepButton } from "../../../components/Button";
import { ButtonWrap } from "../../login/form/LoginForm";
import { GenderInput } from "../../../components/Input/Input";
import { InputGenderError } from "../../../components/Input/InputError";
import { styled } from "styled-components";
const Step4 = ({ errors, setValue, register, getValues, handleNext }) => {
  return (
    <>
      <GenderLabel>성별을 고르세요</GenderLabel>

      <ButtonWrap>
        <GenderInput
          input={maleInput}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          register={register}
        />

        <GenderInput
          input={femaleInput}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          register={register}
        />
      </ButtonWrap>
      <InputGenderError errors={errors} input={femaleInput} />

      <NextStepButton
        handleNext={handleNext}
        getValues={getValues}
        inputErrors={
          errors?.[femaleInput?.name] || errors?.[maleInput?.name]
            ? true
            : false
        }
      />
    </>
  );
};

const GenderLabel = styled.span`
  margin: 1.6rem 0.5rem;
  font-weight: 600;
  color: rgb(128, 113, 252);
  font-size: 1rem;
`;
export default Step4;
