import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { SettingHeader } from "../../../components/Header";
import { SecurityPaswordFormHook } from "../../../hooks/FormHoooks";
import { securityEditPassword } from "../../../components/Form/Schema";
import { useDispatch, useSelector } from "react-redux";
import { passwordEditAction } from "../../../actions/securityEditAction";
import { SECURITY_PASSWORD_RESET } from "../../../constants/securityEditConstants";
import { getSaveListAction } from "../../../actions/saveAction";

const SecurityEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 비밀번호 재설정 후 받는 response값 */
  const passwordEditInfo = useSelector((state) => state.passwordEditInfo);
  const { error, loading, passwordEditStatus } = passwordEditInfo;

  /** 비밀번호 재설정 submit함수 */
  const onSubmit = (passwordInfo) => {
    const {
      /** 현재 비밀번호 */
      currentPassword,

      /** 새 비밀번호 */
      password,

      /** 새 비밀번호 재확인 값 */
      secondPassword,
    } = passwordInfo;

    /** 혹시모를 에러를 위해 재확인 비밀번호와 같은지 확인 */
    if (password === secondPassword) {
      dispatch(
        passwordEditAction({
          currentPassword: currentPassword,
          futurePassword: password,
        })
      );
    }
  };

  /** 해당 페이지로 올때마다 dispath 시작 */
  useEffect(() => {
    dispatch({ type: SECURITY_PASSWORD_RESET });
    dispatch(getSaveListAction(0));
  }, []);
  return (
    <AccountSetting>
      <SettingHeader navigate={navigate} name={"계정보안 설정"} />
      <AccountSettingContent>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >
          비밀번호 변경
        </span>
        <p
          style={{
            fontSize: "1rem",
            margin: "1rem 0",
          }}
        >
          비밀번호는 6자 이상이어야 하고 숫자, 영문, 특수기호의 조합을 포함해야
          합니다.
        </p>
        <SecurityPaswordFormHook
          schema={securityEditPassword}
          onSubmit={onSubmit}
          navigate={navigate}
          error={error}
          loading={loading}
        />
        {passwordEditStatus && !loading && (
          <PasswordEditResponse>비밀번호 변경완료!</PasswordEditResponse>
        )}
      </AccountSettingContent>
    </AccountSetting>
  );
};

const AccountSetting = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
`;

const AccountSettingContent = styled.div`
  height: 100%;
  width: 87%;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  align-items: start;
`;

const PasswordEditResponse = styled.span`
  width: 100%;
  margin-top: 1rem;
  color: rgb(128, 113, 252);
  display: flex;
  justify-content: center;
  font-weight: 600;
`;
export default SecurityEditScreen;
