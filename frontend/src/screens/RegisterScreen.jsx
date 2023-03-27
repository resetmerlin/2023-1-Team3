import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const smallDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const bigDesktop = useMediaQuery({ query: "(min-width: 1281px)" });

  const [userPassword, setUserPassword] = useState("");

  const submitHandler = (data) => console.log(data.secondPassword);
  const passwordCheckHandler = () => {
    const values = getValues();
    const { femaleCheckbox, maleCheckbox } = values;
  };
  return (
    <section className="form">
      {bigDesktop && <span className="logo">VISTA</span>}

      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Register</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            {/** 이메일 입력 핸들러*/}
            <div className="form-input-wrap">
              <input
                className="form-default-height"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors?.email?.type === "required" && (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  Please enter your email
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
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {errors?.name?.type === "required" ? (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  Please enter your name
                </p>
              ) : (
                errors?.name?.type === "pattern" && (
                  <p
                    className="form__wrap__input-error"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "400",
                      color: "red",
                    }}
                  >
                    Your name should contain only Alphabetical characters
                  </p>
                )
              )}
            </div>

            {/** 비밀번호 입력 핸들러*/}
            <div className="form-input-wrap">
              <input
                className="form-default-height"
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
                placeholder="Password"
              />
              {errors?.password?.type === "required" ? (
                <p
                  className="form__wrap__input-error"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    color: "red",
                  }}
                >
                  Please enter your password
                </p>
              ) : (
                errors?.password?.type === "minLength" && (
                  <p
                    className="form__wrap__input-error"
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: "400",
                      color: "red",
                    }}
                  >
                    Your passsword should be more than 8 words
                  </p>
                )
              )}
            </div>

            <div className="form-input-wrap">
              {/** 비밀번호 재입력 핸들러*/}
              <input
                className="form-default-height"
                type="password"
                id="secondPassword"
                {...register("secondPassword", {
                  required: "Your password is less than 10 words",
                  minLength: 8,
                })}
                placeholder="Check Password"
                onChange={passwordCheckHandler}
              />
              <p
                className="form__wrap__input-error"
                style={{
                  fontSize: "1.7rem",
                  fontWeight: "400",
                  color: "red",
                }}
              >
                {errors.password?.message}
              </p>
            </div>

            {/** 성 별 선택 핸들러*/}
            <span className="form-span">Choose your gender</span>

            <div className="form__checkbox-wrap">
              <div className="form__checkbox-wrap--female">
                <input
                  className="form__checkbox"
                  type="checkbox"
                  id="female"
                  {...register("femaleCheckbox", {
                    required: true,
                  })}
                  onChange={passwordCheckHandler}
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
                  {...register("maleCheckbox", {
                    required: true,
                  })}
                />
                <label htmlFor="male" className="form__checkbox--male-label">
                  <i className="bx bx-male"></i>
                </label>
              </div>
            </div>
            <p
              className="form__wrap__input-err7r"
              style={{ fontSize: "0.8rem", fontWeight: "400", color: "red" }}
            >
              {errors.password?.message}
            </p>
            {/** submit 버튼 핸들러*/}
            <button className="form-default-height"> Register</button>
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
