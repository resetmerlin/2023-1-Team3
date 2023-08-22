import { PersonalMajorInput } from '../../../components/Input/Input';
import Button from '../../../components/atoms/button/InstanceMaker';
const Step5 = ({ errors, register, getValueMajor, handleNext }) => {
  const inputErrors = errors?.major ? true : false;

  const disabled = !getValueMajor || inputErrors == true ? true : false;

  const buttonHandler = () => {
    if (!getValueMajor || inputErrors === true) {
    } else {
      handleNext();
    }
  };

  return (
    <>
      <PersonalMajorInput errors={errors} register={register} />

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

export default Step5;
