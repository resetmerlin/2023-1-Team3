import React from "react";
import { PersonalMajorInput } from "../../../components/Input/Input";
const Step5 = ({ errors, register }) => {
  return (
    <>
      <PersonalMajorInput errors={errors} register={register} />
    </>
  );
};

export default Step5;
