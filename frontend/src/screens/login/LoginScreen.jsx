import React, { useEffect, useCallback, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../actions/userAction';
import { LoginFormHook } from '../../hooks/FormHoooks';
import { loginSchema } from '../../components/Form/Schema';
import { selectLoginToken } from '../../hooks/MemoizedRedux';
import { LogoSizeL } from '../../components/Logo';
import Loading from '../../components/Loading';
import { styled } from 'styled-components';
const LoginSceen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Get loginInfo from Redux(loginInfo를 redux에서 가져옴)*/
  const loginInfo = useSelector(selectLoginToken);

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

  useEffect(() => {
    if (loginInfo?.sessfbs_ffa0934) {
      navigate('/');
    }
  }, [loginInfo?.sessfbs_ffa0934]);

  return (
    <LoginSection className='form'>
      <Suspense fallback={<Loading />}>
        <LogoSizeL />
        <FormWrap>
          <LoginFormHook
            schema={loginSchema}
            onSubmit={onSubmit}
            loginInfo={loginInfo}
            navigate={navigate}
          />
        </FormWrap>
      </Suspense>
      <div className='form__background'></div>
    </LoginSection>
  );
};

export const FormWrap = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: flex-start;
  width: 100%;
`;
const LoginSection = styled.section`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width: 90%;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: auto;
  font-size: 1rem;
  position: relative;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-shadow: -1px 0px 12px 7px rgb(236, 234, 247, 1);
  -webkit-box-shadow: -1px 0px 12px 7px rgb(236, 234, 247, 1);
  -moz-box-shadow: -1px 0px 12px 7px rgb(236, 234, 247, 1);
`;

export default LoginSceen;
