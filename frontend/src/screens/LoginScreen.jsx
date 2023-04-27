import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../actions/userAction";
import { LoginFormHook } from "../hooks/FormHoooks";
import { loginSchema } from "../components/Form/Schema";

const LoginSceen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Get loginInfo from Redux(loginInfo를 redux에서 가져옴)*/
  const loginInfo = useSelector((state) => state.loginInfo);

  useEffect(() => {
    /** Go to "/" route if there is an Access token(Access token이 있을 시 바로 "/" route로 감)*/
    if (loginInfo?.sessfbs_ffa0934) {
      navigate("/");
    }
  }, [loginInfo?.sessfbs_ffa0934]);

  /** Getting input data via Submit(Submit을 통해 input data를 가져옴)*/
  const onSubmit = (data) => {
    /** Send data to loginAction after getting the params(params를 받고 난 후 loginAction으로 보냄)*/
    dispatch(
      loginAction({
        mail: data.email,
        password: data.password,
      })
    );
  };

  return (
    <section className="form">
      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Sign in</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>
          <LoginFormHook
            schema={loginSchema}
            onSubmit={onSubmit}
            loginInfo={loginInfo}
          />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default LoginSceen;
