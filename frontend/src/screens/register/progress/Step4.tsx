import { femaleInput, maleInput } from '../../../components/Input/InputsDefine';
import { GenderInput } from '../../../components/Input/Input';
import { InputGenderError } from '../../../components/Input/InputError';
import { styled } from 'styled-components';
import Button from '../../../components/atoms/button/InstanceMaker';
const Step4 = ({ errors, setValue, register, getValues, handleNext }) => {
  const inputErrors =
    errors?.[femaleInput?.name] || errors?.[maleInput?.name] ? true : false;

  const disabled = !getValues || inputErrors == true ? true : false;

  const buttonHandler = () => {
    if (!getValues || inputErrors === true) {
    } else {
      handleNext();
    }
  };
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

      <Button
        onClick={buttonHandler}
        disabled={disabled}
        nativeType="submit"
        className="marginTop-m"
        size="xl"
      >
        다음
      </Button>
    </>
  );
};

const GenderLabel = styled.span`
  margin: 1.6rem 0.5rem;
  font-weight: 600;
  color: rgb(128, 113, 252);
  font-size: 1rem;
`;
const ButtonWrap = styled.div`
display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
`;
export default Step4;
