import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailCodeAction } from "../actions/userAction";
import { registerAction, codeVerificationAction } from "../actions/userAction";
import { useForm } from "react-hook-form";
import { registerSchema } from "../components/Schema";
import { registerInput } from "./Inputs";
import { Link, redirect } from "react-router-dom";
import { genderInput } from "./Inputs";
const RegisterForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [countdown, setCountdown] = useState(60);
  const [intervalId, setIntervalId] = useState(null);

  const codeWaitingTime = 1000;

  const startCountdown = () => {
    setIntervalId(
      setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, codeWaitingTime)
    );
  };

  const handleClick = () => {
    setCountdown(60);
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    startCountdown();
  };
  // Stop the countdown when countdown reaches 0
  if (countdown === 0) {
    clearInterval(intervalId);
  }
  /** Form 제출 state*/
  const onSubmit = (data) => {
    const { birthday, code, email, name, password, gender } = data;

    //회원가입 입력 된 값
    const registerValue = {
      mail: email,
      password: password,
      name: name,
      gender: gender,
      birth: birthday?.toISOString().split("T")[0],
    };

    //인증 코드를 통해 이메일이 유효한다면 회원가입 액션 실행
    if (!codeError) {
      dispatch(registerAction(registerValue));
    }

    // if (!registerError && registerLoading === false) {
    //   return redirect("/login");
    // }
  };
  useEffect(() => {
    if (!registerError && registerLoading === false) {
      navigate("/login");
    }
  });
  /** 에러 저장 state*/
  const [errorCheck, setErrorCheck] = useState("");
  const onError = (errors) => setErrorCheck(errors);

  /** 이메일 값 변수 */
  let emailValue = getValues("email");
  let codeValue = getValues("code");
  /** 이메일 전송 후 state */
  const emailSentStatus = useSelector((state) => state.emailInfo);

  const {
    error: emailError,
    loading: emailLoading,
    emailStatus,
  } = emailSentStatus;

  /** 인증코드 입력 후 state */
  const codeStatusSentStatus = useSelector((state) => state.codeInfo);
  const { loading: codeLoading, error: codeError } = codeStatusSentStatus;

  /** 회원가입 후 state */
  const registerSentStatus = useSelector((state) => state.registerInfo);
  const { error: registerError, loading: registerLoading } = registerSentStatus;

  /** 인증코드 전송 함수*/
  const emailVerifiyHandler = () => {
    emailValue = getValues("email");
    if (emailValue) {
      if (!errorCheck.email) {
        dispatch(sendEmailCodeAction({ mail: emailValue }));

        if (!emailError && !emailLoading) {
          handleClick();
        }
      }
    }
  };
  /** 코드 확인 function */

  const codeVerifyHandler = () => {
    if (!emailError && !emailLoading) {
      emailValue = getValues("email");
      codeValue = getValues("code");

      const codeVerifyValue = {
        mail: emailValue,
        code: codeValue,
      };

      dispatch(codeVerificationAction(codeVerifyValue));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              onClick={emailVerifiyHandler}
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
        {emailValue && !errorCheck.email && (
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
              {errors?.code && !codeError && !codeLoading ? (
                <p className="form__wrap__input-error">
                  {countdown == 0
                    ? "인증 시간이 만료되었습니다. 이메일을 제대로 입력했는지 확인하세요."
                    : `${errors.code.message}, ${
                        countdown == 60 ? " " : countdown
                      }`}
                </p>
              ) : (
                !(!codeError && !codeLoading) && (
                  <p className="form__wrap__input-error">{codeError}</p>
                )
              )}
            </div>
            {!emailLoading && !emailError && (
              <button
                className="form-default-height email-verify-button"
                onClick={codeVerifyHandler}
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
