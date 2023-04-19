import React, { useEffect } from "react";

import { useMediaQuery } from "react-responsive";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginSceen = () => {
  const smallDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const navigate = useNavigate();

  const loginInfo = useSelector((state) => state.loginInfo);
  const { error, loading, sessfbs_ffa0934 } = loginInfo;

  useEffect(() => {
    if (sessfbs_ffa0934) {
      navigate("/");
    }
  }, [sessfbs_ffa0934]);
  return (
    <section className="form">
      {/* {bigDesktop && <span className="logo">VISTA</span>} */}
      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Sign in</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>
          <LoginForm loginProps={loginInfo} />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default LoginSceen;
