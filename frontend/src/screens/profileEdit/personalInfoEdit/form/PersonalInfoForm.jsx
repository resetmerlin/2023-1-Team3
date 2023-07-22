import React from "react";
import { useFormContext } from "react-hook-form";
import {
  nameInput,
  majorInput,
  birthdayInput,
  descriptionInput,
  femaleInput,
  maleInput,
} from "../../../../components/Input/InputsDefine";
import { Form } from "../../../login/form/LoginForm";
import {
  DefaultInput,
  DescriptionInput,
  GenderInput,
  Label,
  PersonalMajorInput,
} from "../../../../components/Input/Input";
import { DefaultInputError } from "../../../../components/Input/InputError";
import { styled } from "styled-components";
import { ChangeProfileButton, SaveButton } from "../../../../components/Button";

const PersonalInfoForm = ({
  onSubmit,
  info,
  user,
  handleChangeProfile,
  changeProfile,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PersonInfoInputWrap>
        {" "}
        <DefaultInput input={nameInput} register={register} errors={errors} />
        <DefaultInputError errors={errors} input={nameInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        {" "}
        <PersonalMajorInput
          input={majorInput}
          register={register}
          errors={errors}
          userPlaceholder={user?.department}
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
          <Label>설명란</Label>
          <DescriptionInput
            input={descriptionInput}
            register={register}
            errors={errors}
          />
        </PersonalInfoDescWrap>
      </PersonInfoInputWrap>

      <PersonalInfoButtonWrap>
        <SaveButton
          error={info?.error}
          loading={info?.loading}
          status={info?.personalInfoEditStatus}
        />

        <ChangeProfileButton handleChangeProfile={handleChangeProfile} />
      </PersonalInfoButtonWrap>
    </Form>
  );
};

export default PersonalInfoForm;

const PersonalInfoButtonWrap = styled.div`
  width: auto;
  // width: 12rem;

  height: auto;
  position: absolute;
  top: 43%;
  right: 3%;
  display: flex;
  justify-content: space-between;
  button {
    margin: 0 0.3rem;
  }
`;
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

const PersonInfoGenderWrap = styled.div`
  display: flex;
`;
