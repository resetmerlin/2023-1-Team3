import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
  } = useForm();
  const submitHandler = (data) => console.log(data);
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
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <input
              className="form-default-height"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Please enter your email correctly",
              })}
            />
            <p
              className="form__wrap__input-error"
              style={{ fontSize: ".8rem", fontWeight: "400", color: "red" }}
            >
              {errors.email?.message}
            </p>

            <input
              className="form-default-height"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Your password is less than 10 words",

                maxLength: 10,
              })}
            />
            {errors.password?.message && (
              <p
                className="form__wrap__input-error"
                style={{ fontSize: ".8rem", fontWeight: "400", color: "red" }}
              >
                {errors.password?.message}
              </p>
            )}

            <button className="form-default-height">Sign in </button>
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
