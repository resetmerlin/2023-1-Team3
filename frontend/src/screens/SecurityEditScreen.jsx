import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SecurityEditScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <section className="securityEdit">
      <div className="securityEdit__top center">
        <Link to="/setting">
          <box-icon name="arrow-back" color="rgb(196, 196, 196)"></box-icon>
          <span>Setting</span>
        </Link>

        <Link to="/setting">
          <box-icon
            name="check"
            color="rgb(196, 196, 196)"
            size="2.3rem"
          ></box-icon>
        </Link>
      </div>
      <div className="securityEdit__content">
        <div className="form__container">
          <div className="form__wrap security-edit-form ">
            <form>
              <div className="form-input-wrap security-edit-input-wrap ">
                <label htmlFor="name">유저 이름</label>
                <input
                  className="form-default-height"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="이름"
                />
                {errors?.name?.type === "required" && (
                  <p
                    className="form__wrap__input-error"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "400",
                      color: "red",
                    }}
                  >
                    이름을 작성하세요
                  </p>
                )}
              </div>
              <div className="form-input-wrap security-edit-input-wrap ">
                <label htmlFor="password">현재 비밀번호</label>
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
                        fontSize: "0.7rem",
                        fontWeight: "400",
                        color: "red",
                      }}
                    >
                      Your passsword should be more than 8 words
                    </p>
                  )
                )}
              </div>

              <div className="form-input-wrap security-edit-input-wrap ">
                <label htmlFor="password">새 비밀번호</label>
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
                        fontSize: "0.7rem",
                        fontWeight: "400",
                        color: "red",
                      }}
                    >
                      Your passsword should be more than 8 words
                    </p>
                  )
                )}
              </div>

              <div className="form-input-wrap security-edit-input-wrap">
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
              <span className="form-span margin-top-10px ">성별 선택</span>

              <div className="form__checkbox-wrap margin-top-10px">
                <div className="form__checkbox-wrap--female">
                  <input
                    className="form__checkbox"
                    type="checkbox"
                    id="female"
                    {...register("femaleCheckbox", {
                      required: true,
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityEditScreen;
