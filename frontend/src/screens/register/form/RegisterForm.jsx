import React, { Suspense } from "react";
import { useFormContext } from "react-hook-form";
import Step1 from "../progress/Step1";
import Step3 from "../progress/Step3";
import Step4 from "../progress/Step4";
import Step5 from "../progress/Step5";
import Loading from "../../../components/Loading";
import { styled } from "styled-components";
import Step2 from "../progress/Step2";
import { Form } from "../../login/form/LoginForm";
import { RegisterButton, SubmitButton } from "../../../components/Button";
import {
  FormLoadingMessage,
  RegisterError,
} from "../../../components/Input/InputError";
import ImageRegister from "../afterRegister/ImageRegister";
import PersonalDesc from "../afterRegister/PersonalDesc";
import Final from "../progress/Final";

const RegisterForm = ({
  onSubmit,
  emailInfo,
  registerInfo,
  sendEmailData,
  sendCodeData,
  handleNext,
  dispatch,
  navigate,
  seconds,
  currentStep,
  codeInfo,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useFormContext();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Suspense fallback={<Loading />}>
        {currentStep == 1 && (
          <Step1
            errors={errors}
            register={register}
            emailInfo={emailInfo}
            getValues={getValues}
            sendEmailData={sendEmailData}
            seconds={seconds}
            codeInfo={codeInfo}
            sendCodeData={sendCodeData}
            getValueEmail={getValues("email")}
            getValueCode={getValues("code")}
            handleNext={handleNext}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {currentStep == 2 && (
          <Step2
            errors={errors}
            register={register}
            handleNext={handleNext}
            getValueName={getValues("name")}
            getValueBirth={getValues("birthday")}
          />
        )}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {currentStep == 3 && (
          <Step3
            errors={errors}
            getValuePassword={getValues("password")}
            getValueSecond={getValues("secondPassword")}
            register={register}
            handleNext={handleNext}
          />
        )}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {currentStep == 4 && (
          <Step4
            errors={errors}
            setValue={setValue}
            register={register}
            handleNext={handleNext}
            getValues={getValues("gender")}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {currentStep == 5 && (
          <Step5
            errors={errors}
            getValueMajor={getValues("major")}
            register={register}
            registerInfo={registerInfo}
            handleNext={handleNext}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {currentStep == 6 && <PersonalDesc register={register} />}
      </Suspense>
      {currentStep == 6 && (
        <>
          <RegisterButton registerInfo={registerInfo} />
          {!registerInfo?.loading && registerInfo?.registerStatus ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormLoadingMessage>
                회원가입을 성공하였습니다!
              </FormLoadingMessage>
            </div>
          ) : (
            <RegisterError
              registerError={registerInfo?.error}
              registerLoading={registerInfo?.loading}
            />
          )}
        </>
      )}

      <Suspense fallback={<Loading />}>
        {currentStep == 7 &&
          !registerInfo?.loading &&
          registerInfo?.registerStatus && (
            <ImageRegister handleNext={handleNext} dispatch={dispatch} />
          )}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {currentStep == 8 &&
          !registerInfo?.loading &&
          registerInfo?.registerStatus && (
            <Final currentStep={currentStep} navigate={navigate} />
          )}
      </Suspense>
    </Form>
  );
};
export const InputAndErrorWrap = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export default RegisterForm;
