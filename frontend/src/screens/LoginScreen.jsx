import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../actions/userAction";
import { LoginFormHook } from "../hooks/FormHoooks";
import { loginSchema } from "../components/Form/Schema";
import { selectLoginToken } from "../hooks/MemoizedRedux";
const LoginSceen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Get loginInfo from Redux(loginInfo를 redux에서 가져옴)*/
  const loginInfo = useSelector(selectLoginToken);

  useEffect(() => {
    if (loginInfo?.sessfbs_ffa0934) {
      navigate("/");
    }
  }, [loginInfo?.sessfbs_ffa0934]);

  const onSubmit = useCallback(
    (data) => {
      dispatch(
        loginAction({
          mail: data.email,
          password: data.password,
        })
      );
    },
    [dispatch]
  );

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
