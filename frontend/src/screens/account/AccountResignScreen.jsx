import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountResignSchema } from "../../components/Form/Schema";
import { accountResignAction } from "../../actions/securityEditAction";
import { getSaveListAction } from "../../actions/saveAction";
import AccountResignScreenView from "./AccountResignScreenView";
import { SECURITY_ACCOUNT_RESIGN_RESET } from "../../constants/securityEditConstants";

const AccountResignScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** 회원탈퇴 후 받는 response값 */
  const accountResignInfo = useSelector((state) => state.accountResignInfo);
  const { error, loading, accountResignStatus } = accountResignInfo;

  /** 비밀번호 submit함수 */
  const onSubmit = (passwordInfo) => {
    const { currentPassword } = passwordInfo;

    dispatch(
      accountResignAction({
        password: currentPassword,
      })
    );
  };

  /** 해당 페이지로 올때마다 dispath 시작 */
  useEffect(() => {
    dispatch(getSaveListAction(0));
    dispatch({ type: SECURITY_ACCOUNT_RESIGN_RESET });
  }, []);

  useEffect(() => {
    if (accountResignStatus === true) navigate("/login");
  }, [accountResignStatus]);

  const props = {
    navigate: navigate,
    schema: accountResignSchema,
    onSubmit: onSubmit,
    serverStatus: accountResignStatus,
    loading: loading,
    error:
      error && accountResignStatus === false
        ? error
        : accountResignStatus === false
        ? "회원 탈퇴 실패, 비밀번호를 다시 확인해주세요"
        : false,
  };

  return <AccountResignScreenView {...props} />;
};

export default AccountResignScreen;
