import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  /** password와 secondPassword(비밀번호 재입력 ) 값이 바뀔때마다 watch */
  const watchAllFields = watch();
  const { password, secondPassword, female, male } = watchAllFields;

  /** 비밀번호 재입력 custom error */
  const customError =
    password !== secondPassword ? "비밀번호가 일치하지 않습니다." : null;

  const [submitCheck, setSubmitCheck] = useState("");
  const onSubmit = (data) => setSubmitCheck(data);
  const onError = (errors, e) => console.log(errors, e);

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

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/** 이메일 입력 핸들러*/}
            <div className="form-input-wrap">
              <input
                className="form-default-height"
                id="email"
                type="email"
                placeholder="Email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value: /\S+@dankook\.ac\.kr/,
                    message: "@dankook.ac.kr 형식에 맞게 작성하세요",
                  },
                })}
              />
              {errors.email && (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/** 이름 입력 핸들러*/}
            <div className="form-input-wrap">
              <input
                className="form-default-height"
                type="name"
                id="name"
                placeholder="Name"
                {...register("name", {
                  required: "이름 항목을 작성해 주세요",
                  pattern: {
                    value: /[\u3131-\uD79D]/giu,
                    message: "숫자,특수문자는 불가능합니다. ",
                  },
                  minLength: {
                    value: 2,
                    message: "이름을 최소 두 글자로 작성하세요",
                  },
                })}
              />

              {errors?.name && (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/** 비밀번호 입력 핸들러*/}
            <div className="form-input-wrap">
              <input
                className="form-default-height"
                type="password"
                id="password"
                {...register("password", {
                  required: "비밀번호를 입력하세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8글자입니다",
                  },
                })}
                placeholder="Password"
              />
              {errors?.password && (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-input-wrap">
              {/** 비밀번호 재입력 핸들러*/}
              <input
                className="form-default-height"
                type="password"
                id="secondPassword"
                {...register("secondPassword", {
                  required: "비밀번호가 일치하지 않습니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8글자입니다",
                  },
                })}
                placeholder="Check Password"
              />
              {customError ? (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  {customError}
                </p>
              ) : (
                ""
              )}
            </div>

            {/** 성별 선택 핸들러*/}
            <span className="form-span">성별을 고르세요</span>

            <div className="form__checkbox-wrap">
              <div className="form__checkbox-wrap--female">
                <input
                  className="form__checkbox"
                  type="checkbox"
                  id="female"
                  {...register("female", {
                    // required: "성별을 선택해주세요",
                  })}
                />
                <label
                  htmlFor="female"
                  className="form__checkbox--female-label"
                >
                  <i className="bx bx-female"></i>
                </label>
              </div>
              <div className="form__checkbox-wrap--male">
                <input
                  type="checkbox"
                  className="form__checkbox"
                  id="male"
                  {...register("male", {
                    // required: "성별을 선택해주세요",
                  })}
                />
                <label htmlFor="male" className="form__checkbox--male-label">
                  <i className="bx bx-male"></i>
                </label>
              </div>
            </div>
            {female === true && male ? (
              <p
                className="form__wrap__input-err7r"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  color: "red",
                  textAlign: "center",
                }}
              >
                성별은 둘다 선택할 수 없습니다.
              </p>
            ) : female === false && male === false ? (
              <p
                className="form__wrap__input-err7r"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  color: "red",
                  textAlign: "center",
                }}
              >
                성별을 선택해주세요
              </p>
            ) : (
              ""
            )}
            {/** 이메일 인증코드 handler*/}
            {submitCheck ? (
              <div className="form-input-wrap">
                <input
                  className="form-default-height"
                  id="code"
                  type="text"
                  placeholder="인증 코드"
                  aria-invalid={errors.code ? "true" : "false"}
                  {...register("code", {
                    required: "이메일에 도착한 코드를 입력하세요",
                  })}
                />
                {errors.code && (
                  <p
                    className="form__wrap__input-error"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "400",
                      color: "red",
                    }}
                  >
                    {errors.code.message}
                  </p>
                )}
              </div>
            ) : (
              ""
            )}

            {/** submit 버튼 핸들러*/}
            <button className="form-default-height" type="submit">
              Register
            </button>
          </form>

          <div className="form__link__wrap">
            <Link to="/login" className="form__wrap__link">
              Have an Account?
            </Link>
          </div>
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default RegisterScreen;
