import React from "react";
import { useFormContext } from "react-hook-form";
import { DefaultPasswordInput } from "../../../components/Input/Input";
import { styled } from "styled-components";

import { currentPasswordInput } from "../../../components/Input/InputsDefine";
import { InputEmailError } from "../../../components/Input/InputError";
import ResignPopup from "../popup/ResignPopup";

const ResignForm = ({ onSubmit, error, loading }) => {
  const resignAccountInfo = {
    error,
    loading,
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", height: "rem" }}
    >
      <DefaultPasswordInput
        input={currentPasswordInput}
        register={register}
        errors={errors}
        info={resignAccountInfo}
      />

      <InputEmailError
        errors={errors}
        input={currentPasswordInput}
        loginInfo={resignAccountInfo}
      />

      <input
        type="checkbox"
        name="account-drop"
        id="account-drop"
        style={{ display: "none" }}
      />
      <ResignPopup />

      {!errors?.currentPasswordInput?.name && (
        <PopupLabelWrap>
          <PopupLabel htmlFor="account-drop">회원 탈퇴</PopupLabel>
        </PopupLabelWrap>
      )}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  .setting-quit-popup {
    display: none;
  }
  #account-drop:checked + .setting-quit-popup {
    display: flex;
  }
`;
const PopupLabelWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.3rem;
  width: 100%;
  margin-top: 2rem;
  cursor: pointer;
`;

const PopupLabel = styled.label`
  width: 100%;
  height: 100%;
  background-color: rgb(128, 113, 252);
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.3rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ResignForm;
