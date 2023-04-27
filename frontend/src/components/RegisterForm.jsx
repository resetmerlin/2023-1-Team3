import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailCodeAction } from "../actions/userAction";
import { registerAction, codeVerificationAction } from "../actions/userAction";
import { useForm } from "react-hook-form";
import { registerSchema } from "../components/Schema";
import { registerInput } from "./Inputs";
import { Link } from "react-router-dom";
import { genderInput } from "./Inputs";
const RegisterForm = () => {
  const dispatch = useDispatch();

  /** Get emailInfo state from Redux(Redux에서 emailInfo state 가져옴) */
  const emailInfo = useSelector((state) => state.emailInfo);
  const { error: emailError, loading: emailLoading, emailStatus } = emailInfo;

  /** Get codeInfo state from Redux(Redux에서 codeInfo state 가져옴) */
  const codeInfo = useSelector((state) => state.codeInfo);
  const { loading: codeLoading, error: codeError } = codeInfo;

  /** Get registerInfo state from Redux(Redux에서 registerInfo state 가져옴) */
  const registerInfo = useSelector((state) => state.registerInfo);
  const { error: registerError, loading: registerLoading } = registerInfo;

  /** seconds state for 60sec countdown(60초 countdown을 위한 second state) */
  const [seconds, setSeconds] = useState(60);

  /** Code count down start state(코드 카운트 다운 시작에 대한 상태 ) */
  const [isCoundown, setIsCountdown] = useState(false);

  useEffect(() => {
    /**If there is no error and loading after register, navigate to login page(만약 로그인 후 에러,로딩이 false일 시 login page로 navigate) */
    if (!registerError && registerLoading === false) {
      navigate("/login");
    } else if (
      /** if Count down is true && email response is true(만약 이메일 카운트 다운이 true && email res가 trure일시)  */
      isCoundown &&
      emailStatus
    ) {
      /** Countdown interval function */
      const interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          setIsCountdown(false);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, registerError, registerLoading, isCoundown, emailStatus]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(registerSchema) });

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
    if (emailStatus) {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/** 이메일 입력 핸들러*/}
        <div className="form-input-wrap form-input-email__wrap">
          <div className="form-input-wrap form-input-email">
            <input
              className="form-default-height"
              id="email"
              type="email"
              placeholder="Email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
              style={{
                border: errors?.email?.message ? "1px solid red" : "",
                borderRadius: errors?.email?.message ? "5px" : "",
              }}
            />
          </div>
          {!errors?.email && (
            <button
              className="form-default-height email-verify-button"
              onClick={() => {
                sendEmailData(getValues("email"));
              }}
              type="button"
            >
              코드 전송
            </button>
          )}
        </div>

        {errors.email ? (
          <p className="form__wrap__input-error">{errors.email.message}</p>
        ) : (
          !emailLoading &&
          emailError && <p className="form__wrap__input-error">{emailError}</p>
        )}
        {/** 이메일 인증코드 handler*/}
        {/** submit 버튼 핸들러*/}
        {emailStatus && !errors.email && (
          <div className="form-input-wrap form-input-email__wrap ">
            <div className="form-input-wrap form-input-email">
              <input
                className="form-default-height"
                id="code"
                type="text"
                placeholder="인증 코드"
                style={{
                  border: errors?.code?.message ? "1px solid red" : "",
                  borderRadius: errors?.email?.message ? "5px" : "",
                }}
                aria-invalid={errors.code ? "true" : "false"}
                {...register("code")}
              />

              {emailStatus && !codeLoading && codeError ? (
                <p className="form__wrap__input-error">{codeError}</p>
              ) : emailStatus && seconds == 0 ? (
                <p className="form__wrap__input-error">
                  입력기간이 만료되었습니다. 코드 전송 버튼을 다시 눌러주세요
                </p>
              ) : (
                <p className="form__wrap__input-error">{seconds}</p>
              )}
            </div>
            {!emailLoading && !emailError && (
              <button
                className="form-default-height email-verify-button"
                onClick={() => {
                  sendCodeData(getValues("email"), getValues("code"));
                }}
                type="button"
              >
                인증
              </button>
            )}
          </div>
        )}

        {/* 비밀번호 및 비밀번호 재 압력 칸 및 이름 */}
        {registerInput.map((input) => {
          return (
            <div className="form-input-wrap" key={input.name}>
              <input
                className="form-default-height"
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.placeholder}
                {...register(input.name)}
                style={{
                  border: errors?.[input.name]?.message ? "1px solid red" : "",
                  borderRadius: errors?.[input.name]?.message ? "5px" : "",
                }}
              />
              {errors?.[input.name] && (
                <p className="form__wrap__input-error">
                  {errors?.[input.name].message}
                </p>
              )}
            </div>
          );
        })}

        {/** 성별 선택 핸들러*/}
        <span className="form-span">성별을 고르세요</span>
        <div className="form__checkbox-wrap">
          {genderInput.map((input) => {
            return (
              <div
                className={`form__checkbox-wrap--${input.id}`}
                key={input.id}
              >
                <input
                  className="form__checkbox"
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  value={input.value}
                  onChange={() => setValue(input.name, input.value)}
                  {...register(input.name)}
                />
                <label
                  htmlFor={`${input.id}`}
                  className={`form__checkbox--${input.id}-label`}
                >
                  <i className={`bx bx-${input.id}`}></i>
                </label>
              </div>
            );
          })}
        </div>
        {errors?.gender && (
          <p
            className="form__wrap__input-error"
            style={{
              textAlign: "center",
            }}
          >
            {errors?.gender.message}
          </p>
        )}

        <div className="form-input-wrap">
          <input
            className="form-default-height"
            type="date"
            id="birthday"
            {...register("birthday")}
            style={{
              border: errors?.birthday?.message ? "1px solid red" : "",
              borderRadius: errors?.email?.message ? "5px" : "",
            }}
          />

          {errors?.birthday && (
            <p className="form__wrap__input-error">{errors.birthday.message}</p>
          )}
        </div>

        {/** submit 버튼 핸들러*/}
        <button className="form-default-height" type="submit">
          회원가입
        </button>

        {registerError && !registerLoading && (
          <p
            className="form__wrap__input-error"
            style={{
              textAlign: "center",
              margin: ".4rem 0",
            }}
          >
            {registerError}
          </p>
        )}
      </form>

      <div className="form__link__wrap">
        <Link to="/login" className="form__wrap__link">
          Have an Account?
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
