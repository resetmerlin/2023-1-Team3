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

  /** 코드 인증 시간 60초 countdown을 위한 state*/
  const [seconds, setSeconds] = useState(60);

  /** 코드 카운트 다운 시작에 대한 false or true 상태*/
  const [isCountdown, setIsCountdown] = useState(false);

  /** 이메일 주소를 서버에 전송하기 위한 함수*/
  const sendEmailData = (emailValue) => {
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
    if (emailInfo.emailStatus) {
      dispatch(codeVerificationAction({ mail: emailValue, code: codeValue }));
    }
  };

  /** 폼 제출 후 input에러 없을 시 input 데이터를 서버에 전송하는 함수*/
  const onSubmit = (data) => {
    /** 유효한 계정일 시 서버에 작성한 폼 정보 전송 */
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
    /** 회원가입 성공할 시 로그인 화면으로 navigate*/
    if (
      !registerInfo?.registerError &&
      registerInfo?.registerLoading === false
    ) {
      navigate("/login");
    }
  }, [registerInfo?.registerError, registerInfo?.registerLoading]);

  useEffect(() => {
    /**  코드 countdown 작동 */
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
