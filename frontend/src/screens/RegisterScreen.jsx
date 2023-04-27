import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RegisterFormHook } from "../hooks/FormHoooks";
import { registerSchema } from "../components/Form/Schema";
import {
  sendEmailCodeAction,
  codeVerificationAction,
  registerAction,
} from "../actions/userAction";

const RegisterScreen = () => {
  const dispatch = useDispatch();

  /** Redux에서 emailInfo state 가져옴 */
  const emailInfo = useSelector((state) => state.emailInfo);

  /** code 인증 이후 에러를 보여주기 위해 codeInfo 가져옴*/
  const codeInfo = useSelector((state) => state.codeInfo);
  /** 코드에러가 있을 시 submit 기능 방지 위해 가져옴 */
  const { error: codeError } = codeInfo;

  /** 회원가입 후 response값을 보기 위해 가져옴*/
  const registerInfo = useSelector((state) => state.registerInfo);

  /** 60초 countdown을 위한  state*/
  const [seconds, setSeconds] = useState(60);

  /** 코드 카운트 다운 시작에 대한 상태 ) */
  const [isCountdown, setIsCountdown] = useState(false);

  /** sending email data function(이메일 주소 전송 함수)*/
  const sendEmailData = (emailValue) => {
    dispatch(sendEmailCodeAction({ mail: emailValue }));

    /** Erase Code Error State to see Rerender countdown(Rerender된 카운트다운을 다시 보기 위해 code error 지움*/
    codeInfo.error = "";

    /** Set seconds to 60 seconds(60초로 설정) */
    setSeconds(60);

    /** Set Countdown state to true(Countdown 상태를 true값으로 설정)*/
    setIsCountdown(true);
  };

  /** send email,code to codeVerification action(codeVerification action에 email, code 보냄) */
  const sendCodeData = (emailValue, codeValue) => {
    /** If email response status is true, dispatch(만약 이메일 response status 값이 true일 경우 dispatch)*/
    if (emailInfo.emailStatus) {
      dispatch(codeVerificationAction({ mail: emailValue, code: codeValue }));
    }
  };

  /** Getting input data via Submit(Submit을 통해 input data를 가져옴)*/
  const onSubmit = (data) => {
    /** if no code error, dispatch register action(이메일 코드 에러가 없을 시 register action를 dispatch) */
    if (!codeError) {
      dispatch(
        registerAction({
          mail: data.email,
          password: data.password,
          name: data.name,
          gender: data.gender,
          birth: data.birthday?.toISOString().split("T")[0],
        })
      );
    }
  };

  useEffect(() => {
    if (
      !registerInfo?.registerError &&
      registerInfo?.registerLoading === false
    ) {
      navigate("/login");
    }
  }, [registerInfo?.registerError, registerInfo?.registerLoading]);

  useEffect(() => {
    if (isCountdown && emailInfo?.emailStatus) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          setIsCountdown(false);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, isCountdown, emailInfo?.emailStatus]);

  return (
    <section className="form">
      {/* {bigDesktop && <span className="logo">VISTA</span>} */}

      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Register</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>
          <RegisterFormHook
            schema={registerSchema}
            onSubmit={onSubmit}
            emailInfo={emailInfo}
            registerInfo={registerInfo}
            sendEmailData={sendEmailData}
            sendCodeData={sendCodeData}
            seconds={seconds}
            codeInfo={codeInfo}
          />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default RegisterScreen;
