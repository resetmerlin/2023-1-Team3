import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { schema } from "../components/Schema";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginSceen = () => {
  const smallDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const bigDesktop = useMediaQuery({ query: "(min-width: 1281px)" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  /** Form 제출 state*/
  const onSubmit = (data) => {
    const { email, password } = data;

    if (data) {
      dispatch(
        registerAction({
          mail: email,
          password: password,
        })
      );
    }
  };
  return (
    <section className="form">
      {bigDesktop && <span className="logo">VISTA</span>}
      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Sign in</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>
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
            <p className="form__wrap__input-error">{errors.email?.message}</p>

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
              <p className="form__wrap__input-error">
                {errors.password?.message}
              </p>
            )}

            <button className="form-default-height" type="submit">
              Sign in
            </button>
            <Link to="/register" className="form__wrap__link">
              Not a member yet?
            </Link>
          </form>
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default LoginSceen;
