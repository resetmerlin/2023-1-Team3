import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  nameInput,
  majorInput,
  birthdayInput,
  descriptionInput,
} from '../../../../components/Input/InputsDefine';
import { Form } from '../../../login/form/LoginForm';
import {
  DefaultInput,
  DescriptionInput,
  Label,
  PersonalMajorInput,
} from '../../../../components/Input/Input';
import { DefaultInputError } from '../../../../components/Input/InputError';
import { styled } from 'styled-components';

import Button from '../../../../components/atoms/button/InstanceMaker';

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

  const status = info?.personalInfoEditStatus;
  const loading = info?.loading;

  const changeProfileHandler = (event) => {
    event.preventDefault();

    handleChangeProfile();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PersonInfoInputWrap>
        {' '}
        <DefaultInput input={nameInput} register={register} errors={errors} />
        <DefaultInputError errors={errors} input={nameInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        {' '}
        <PersonalMajorInput
          input={majorInput}
          register={register}
          errors={errors}
          userPlaceholder={user?.department}
        />
        <DefaultInputError errors={errors} input={majorInput} />
      </PersonInfoInputWrap>
      <PersonInfoInputWrap>
        {' '}
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
        <Button
          nativeType="submit"
          size="s"
          type={status && !loading ? 'primary' : 'secondary'}
        >
          {status && loading === false
            ? '저장 완료!'
            : loading === undefined && status === undefined
            ? '저장'
            : '저장'}
        </Button>

        <Button size="s" type="secondary" onClick={changeProfileHandler}>
          프로필 변경
        </Button>
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
    border: none;
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
