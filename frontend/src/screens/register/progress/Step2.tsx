import { DefaultInputChunk } from '../../../components/Input/InputChunk';
import {
  nameInput,
  birthdayInput,
} from '../../../components/Input/InputsDefine';
import { InputAndErrorWrap } from '../form/RegisterForm';
import Button from '../../../components/atoms/button/InstanceMaker';

const Step2 = ({
  errors,
  register,
  handleNext,
  getValueName,
  getValueBirth,
}) => {
  const inputErrors =
    errors?.[nameInput?.name] || errors?.[birthdayInput?.name] ? true : false;

  const getValues = !getValueBirth || !getValueName ? false : true;

  const disabled = !getValues || inputErrors == true ? true : false;

  const buttonHandler = () => {
    if (!getValues || inputErrors === true) {
    } else {
      handleNext();
    }
  };
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

export default Step2;
