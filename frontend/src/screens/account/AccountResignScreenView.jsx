import React from "react";
import { styled } from "styled-components";
import { SettingHeader } from "../../components/Header";
import { SecurityResignFormHook } from "../../hooks/FormHoooks";

const AccountResignScreenView = ({
  navigate,
  schema,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <AccountSetting>
      <SettingHeader navigate={navigate} name={"계정 탈퇴 설정"} />
      <AccountSettingContent>
        <p
          style={{
            fontSize: "1rem",
            margin: "1rem 0",
          }}
        >
          탈퇴 버튼 선택 시 계정은 삭제되며 복구되지 않습니다. 현재 비밀번호를
          작성하고 버튼을 눌러주세요.
        </p>

        <SecurityResignFormHook
          schema={schema}
          onSubmit={onSubmit}
          navigate={navigate}
          error={error}
          loading={loading}
        />
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
  color: red;
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

export default AccountResignScreenView;
