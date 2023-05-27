import React from "react";
import { descriptionInput } from "../../../components/Input/InputsDefine";
import { DescriptionInput, Label } from "../../../components/Input/Input";
const PersonalDesc = ({ register }) => {
  return (
    <>
      <Label style={{ fontSize: "1rem" }} htmlFor={descriptionInput.name}>
        아무거나 적어주세요!(필수 입력란은 아닙니다)
      </Label>

      <DescriptionInput register={register} input={descriptionInput} />
    </>
  );
};

export default PersonalDesc;
