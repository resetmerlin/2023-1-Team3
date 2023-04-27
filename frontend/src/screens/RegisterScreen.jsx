import React from "react";
import RegisterForm from "../components/RegisterForm";
const RegisterScreen = () => {
  /** Form 입력란 schema*/

  return (
    <section className="form">
      {/* {bigDesktop && <span className="logo">VISTA</span>} */}

      <div className="form__container">
        <div className="form__wrap">
          <div className="form__logo">
            <span className="form__logo-big">Register</span>
            <span className="form__logo-small">
              Broaden your connection via VISTA
            </span>
          </div>
          <RegisterForm />
        </div>
      </div>

      <div className="form__background"></div>
    </section>
  );
};

export default RegisterScreen;
