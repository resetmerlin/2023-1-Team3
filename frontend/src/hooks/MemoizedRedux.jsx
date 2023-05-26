import { createSelector } from "reselect";

const registerInfo = (state) => state.registerInfo;

const selectLoginInfo = (state) => state.loginInfo;
const selelctEmailInfo = (state) => state.emailInfo;

const selectCodeInfo = (state) => state.codeInfo;

export const memoizedRegisterInfo = createSelector(
  [registerInfo],
  (registerInfo) => registerInfo
);

export const memoizedCodeInfo = createSelector(
  [selectCodeInfo],
  (codeInfo) => codeInfo
);

export const memoizedEmailInfo = createSelector(
  [selelctEmailInfo],
  (emailInfo) => emailInfo
);

export const selectLoginToken = createSelector(
  [selectLoginInfo],
  (loginInfo) => loginInfo
);

export const authToken = createSelector(
  [selectLoginInfo],
  (loginInfo) => loginInfo?.sessfbs_ffa0934
);

export const reAuthToken = createSelector(
  [selectLoginInfo],
  (loginInfo) => loginInfo?.sessfbs_ffa0934?.refreshToken
);
