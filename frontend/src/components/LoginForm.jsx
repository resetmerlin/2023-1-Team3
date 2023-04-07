import React from "react";
import { loginSchema } from "../components/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  /** Form 제출 state*/

  const loginStatus = useSelector((state) => state.loginInfo);

  const { error: loginEror, loading: loginLoading } = loginStatus;
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
      <input
        className="form-default-height"
        type="email"
        id="email"
        placeholder="Email"
        {...register("email")}
        style={{
          border: errors?.email?.message ? "1px solid red" : "",
          borderRadius: errors?.email?.message ? "5px" : "",
        }}
      />

      {errors?.email ? (
        <p className="form__wrap__input-error">{errors.email?.message}</p>
      ) : loginEror && !loginLoading ? (
        <p className="form__wrap__input-error">{loginEror}</p>
      ) : (
        ""
      )}

      <input
        className="form-default-height"
        type="password"
        id="password"
        placeholder="Password"
        {...register("password")}
        style={{
          border: errors?.email?.message ? "1px solid red" : "",
          borderRadius: errors?.email?.message ? "5px" : "",
        }}
      />
      {errors.password?.message && (
        <p className="form__wrap__input-error">{errors.password?.message}</p>
      )}

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
