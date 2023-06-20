import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterFormHook } from "../../hooks/FormHoooks";
import { registerSchema } from "../../components/Form/Schema";
import {
  sendEmailCodeAction,
  codeVerificationAction,
  registerAction,
  loginAction,
} from "../../actions/userAction";

import { batch } from "react-redux";

import ProgressBar from "../../components/ProgressBar";
import { memoizedRegisterInfo } from "../../hooks/MemoizedRedux";
import Loading from "../../components/Loading";
import { styled } from "styled-components";
import {
  BackButton,
  BackFormButton,
  GoFormButton,
} from "../../components/Button";
import { HorizontalLine } from "../../components/HorizontalLine";

import {
  registerCodeResetAction,
  registerEmailResetAction,
  registerResetAction,
} from "../../actions/resetAction";
import { DefaultBackHeader } from "../../components/Header";
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInfo = useSelector((state) => state.emailInfo);

  /** code 인증 이후 에러를 보여주기 위해 codeInfo 가져옴*/
  const codeInfo = useSelector((state) => state.codeInfo);

  /** 회원가입 후 response값을 보기 위해 가져옴*/
  const registerInfo = useSelector(memoizedRegisterInfo);

  /** 코드 인증 시간 60초 countdown을 위한 state*/
  const [seconds, setSeconds] = useState(60);

  /** 코드 카운트 다운 시작에 대한 false or true 상태*/
  const [isCountdown, setIsCountdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const handleNext = useCallback(() => {
    if (currentStep == 1) {
      setSeconds(0);
    }
    setCurrentStep(currentStep + 1);
  }, [currentStep, setSeconds]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  /** 이메일 주소를 서버에 전송하기 위한 함수*/
  const sendEmailData = (emailValue) => {
    emailInfo.error = "";

    dispatch(sendEmailCodeAction({ mail: emailValue }));

    /** 리렌더 이후 60초 카운트 다운 대신 코드 에러 response값이 보이는 상황 방지*/
    codeInfo.error = "";

    /** countdown 60초로 설정 */
    setSeconds(60);

    /** Countdown 시작(true)*/
    setIsCountdown(true);
  };

  /**  이메일, 코드를 서버에 전송하여 유효한 계정인지 확인하기 위한 함수 */
  const sendCodeData = (emailValue, codeValue) => {
    /** 이메일이 유효한지 확인 */

    codeInfo.error = "";

    if (emailInfo.emailStatus) {
      dispatch(codeVerificationAction({ mail: emailValue, code: codeValue }));
    }
  };

  const onSubmit = async (data) => {
    if (
      !codeInfo?.error &&
      data.email &&
      data.major &&
      data.description &&
      data.password &&
      data.name &&
      data.gender &&
      data.birthday
    ) {
      await dispatch(
        registerAction({
          mail: data.email,
          department: data.major,
          introduction: data.description,
          password: data.password,
          name: data.name,
          gender: data.gender,
          birth: data.birthday?.toISOString().split("T")[0],
        })
      );

      startLogin(data);
    }
  };

  const startLogin = (data) => {
    dispatch(
      loginAction({
        mail: data.email,
        password: data.password,
      })
    );
  };
  useEffect(() => {
    /** 회원가입 성공할 시 로그인 화면으로 navigate*/
    if (registerInfo?.registerStatus && registerInfo?.loading === false) {
      setCurrentStep(7);
    }
  }, [registerInfo?.registerStatus, setCurrentStep, registerInfo?.loading]);

  useEffect(() => {
    return batch(() => {
      dispatch(registerResetAction());
      dispatch(registerEmailResetAction());
      dispatch(registerCodeResetAction());
      setCurrentStep(1);
    });
  }, [dispatch, batch]);

  useEffect(() => {
    /**  코드 countdown 작동 */
    if (isCountdown && emailInfo?.emailStatus) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          setIsCountdown(false);
          clearInterval(interval);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, isCountdown, emailInfo?.emailStatus]);

  return (
    <RegisterSection>
      <Suspense fallback={<Loading />}>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        {currentStep == 1 ? (
          <DefaultBackHeader navigate={navigate} />
        ) : currentStep !== 8 ? (
          <BackFormButton handlePrevious={handlePrevious} />
        ) : (
          ""
        )}

        <>
          <RegisterFormWrap>
            <RegisterFormHook
              schema={registerSchema}
              onSubmit={onSubmit}
              emailInfo={emailInfo}
              registerInfo={registerInfo}
              sendEmailData={sendEmailData}
              sendCodeData={sendCodeData}
              handleNext={handleNext}
              totalSteps={totalSteps}
              seconds={seconds}
              currentStep={currentStep}
              codeInfo={codeInfo}
              dispatch={dispatch}
              navigate={navigate}
            />
            {currentStep !== 8 && (
              <>
                {" "}
                <HorizontalLine />
                <GoFormButton page={"login"} navigate={navigate} />
              </>
            )}
          </RegisterFormWrap>
        </>
      </Suspense>

      <div className="form__background"></div>
    </RegisterSection>
  );
};
const RegisterSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: auto;
`;

const RegisterFormWrap = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: flex-start;
  width: 90%;
  position: absolute;
  top: 11%;
`;
export default RegisterScreen;
