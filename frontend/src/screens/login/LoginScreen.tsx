import React, { useEffect, useCallback, Suspense } from 'react';
import './Login.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../actions/userAction';
import { LoginFormHook } from '../../hooks/FormHoooks';
import { loginSchema } from '../../components/Form/Schema';
import { selectLoginToken } from '../../hooks/MemoizedRedux';
import { LogoLargeSize } from '../../components/atoms/logo/Logo';
import Loading from '../../components/Loading';

export default function LoginSceen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Get loginInfo from Redux(loginInfo를 redux에서 가져옴) */
  const loginInfo = useSelector(selectLoginToken);

  const onSubmit = useCallback(
    (data: { email: string; password: string }) => {
      dispatch(
        loginAction({
          mail: data.email,
          password: data.password,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (loginInfo?.sessfbs_ffa0934) {
      navigate('/');
    }
  }, [loginInfo?.sessfbs_ffa0934]);

  return (
    <section className="login">
      <Suspense fallback={<Loading />}>
        <LogoLargeSize />
        <div className="login__form-wrap">
          <LoginFormHook
            schema={loginSchema}
            onSubmit={onSubmit}
            loginInfo={loginInfo}
            navigate={navigate}
          />
        </div>
      </Suspense>
    </section>
  );
}
