import React from "react";
import { useFormContext } from "react-hook-form";
import {
  nameInput,
  majorInput,
  birthdayInput,
  descriptionInput,
} from "../../../components/Input/InputsDefine";
import { Form } from "../../login/form/LoginForm";
import {
  DefaultInput,
  DescriptionInput,
  Label,
  PersonalMajorInput,
} from "../../../components/Input/Input";
import { DefaultInputError } from "../../../components/Input/InputError";
import { styled } from "styled-components";
import { SaveButton } from "../../../components/Button";

const PersonalInfoForm = ({ onSubmit, error, loading }) => {
  const afterFormChangeInfo = {
    error,
    loading,
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PersonInfoInputWrap>
        {" "}
        <DefaultInput
          input={nameInput}
          register={register}
          errors={errors}
          info={afterFormChangeInfo}
        />
        <DefaultInputError errors={errors} input={nameInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        {" "}
        <PersonalMajorInput
          input={majorInput}
          register={register}
          errors={errors}
        />
        <DefaultInputError errors={errors} input={majorInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        {" "}
        <DefaultInput
          input={birthdayInput}
          register={register}
          errors={errors}
        />
        <DefaultInputError errors={errors} input={birthdayInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        <PersonalInfoDescWrap>
          <Label>자기소개</Label>
          <DescriptionInput
            input={descriptionInput}
            register={register}
            errors={errors}
          />
        </PersonalInfoDescWrap>
      </PersonInfoInputWrap>
      <SaveButton />
    </Form>
  );
};

export default PersonalInfoForm;

const PersonalInfoDescWrap = styled.div`
  div {
    margin-top: 0.5rem !important;
  }
  #description {
    width: 100% !important;
  }
`;

const PersonInfoInputWrap = styled.div`
  margin: 0.3rem 0.5rem;
`;
