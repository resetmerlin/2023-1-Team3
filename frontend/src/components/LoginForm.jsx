import React, { useEffect } from "react";
import { loginSchema } from "../components/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginInput } from "./Inputs";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  /** Form 제출 state*/

  const loginStatus = useSelector((state) => state.loginInfo);
  const { error: loginEror, loading: loginLoading, loginInfo } = loginStatus;

  useEffect(() => {
    if (loginInfo) {
      navigate("/");
    }
  }, [loginInfo]);

  const onError = (errors) => {
    console.log(errors);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    if (data) {
      dispatch(
        loginAction({
          mail: email,
          password: password,
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              loginEror &&
              !loginLoading &&
              input.name == "email" && (
                <p className="form__wrap__input-error">{loginEror}</p>
              )
            )}
          </div>
        );
      })}

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
