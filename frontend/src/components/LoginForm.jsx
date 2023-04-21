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

  /** En: loading state while Login
   *
   * Kr: 로그인 동안의 로딩 상태 */
  const loginLoading = loginInfo.loading;

  /** En; React-hook-form to handle form submit
   *
   *  Kr: form 제출을 handle 하기 위해 React-hook-form 사용 */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  /**
   * @param data En: The Input data After u sumbit successfully/ Kr: form제출이 성공적으로 된 후 보내는 Input 데이터
   */
  const onSubmit = (data) => {
    const { email, password } = data;

    /** En: Login value that client gonna send to server
     *
     *  Kr: 클라이언트가 서버에게 보낼 로그인 값*/
    const loginValue = {
      mail: email,
      password: password,
    };

    if (loginValue) {
      dispatch(loginAction(loginValue));
    }
  };

  console.log(loginValue);
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
              !loginLoading &&
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
