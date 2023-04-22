import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSceen = () => {
  const navigate = useNavigate();

  /** Get loginInfo from Redux(loginInfo를 redux에서 가져옴)*/
  const loginInfo = useSelector((state) => state.loginInfo);

  useEffect(() => {
    /** Go to "/" route if there is an Access token(Access token이 있을 시 바로 "/" route로 감)*/
    if (loginInfo?.sessfbs_ffa0934) {
      navigate("/");
    }
  }, [loginInfo?.sessfbs_ffa0934]);

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
          <LoginForm loginInfo={loginInfo} />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default LoginSceen;
