import React from "react";

import { useMediaQuery } from "react-responsive";
import LoginForm from "../components/LoginForm";

const LoginSceen = () => {
  const smallDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });
  const bigDesktop = useMediaQuery({ query: "(min-width: 1281px)" });

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
          <LoginForm />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default LoginSceen;
