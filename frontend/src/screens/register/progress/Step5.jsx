import React from "react";
import { PersonalMajorInput } from "../../../components/Input/Input";
import { NextStepButton } from "../../../components/Button";
const Step5 = ({ errors, register, getValueMajor, handleNext }) => {
  return (
    <>
      <PersonalMajorInput errors={errors} register={register} />

      <NextStepButton
        handleNext={handleNext}
        getValues={getValueMajor}
        inputErrors={errors?.major ? true : false}
      />
    </>
  );
};

export default Step5;
