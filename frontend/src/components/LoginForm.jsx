import React from "react";
import { loginSchema } from "../components/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginInput } from "./Inputs";

const LoginForm = ({ loginInfo }) => {
  const dispatch = useDispatch();

  /**React-hook-form to handle form submit(form 제출을 handle 하기 위해 React-hook-form 사용) */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  /** Getting input data via Submit(Submit을 통해 input data를 가져옴)*/
  const onSubmit = (data) => {
    /** Passing email and password as an arument(이메일, 비밀번호 값을 arguments로 보냄 )*/
    sendLoginData(data.email, data.password);
  };

  /** Send data to loginAction after getting the params(params를 받고 난 후 loginAction으로 보냄)*/
  const sendLoginData = (email, password) => {
    dispatch(
      loginAction({
        mail: email,
        password: password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Mapping the loginInput array */}
      {loginInput.map((input) => {
        return (
          <div key={input.name}>
            <input
              className="form-default-height"
              type={input.type}
              id={input.name}
              placeholder={input.placeholder}
              {...register(input.name)}
              style={{
                border: errors?.[input.name]?.message ? "1px solid red" : "",
                borderRadius: errors?.[input.name]?.message ? "5px" : "",
                width: "100%",
              }}
            />
            {errors?.[input.name] ? (
              <p className="form__wrap__input-error">
                {input.name == "password"
                  ? errors?.password?.message
                  : errors?.email?.message}
              </p>
            ) : (
              loginInfo.error &&
              !loginInfo.loading &&
              input.name == "email" && (
                <p className="form__wrap__input-error">{loginInfo.error}</p>
              )
            )}
          </div>
        );
      })}

      {/* Submit button */}
      <button className="form-default-height" type="submit">
        Sign in
      </button>
      <Link to="/register" className="form__wrap__link">
        Not a member yet?
      </Link>
    </form>
  );
};

export default LoginForm;
