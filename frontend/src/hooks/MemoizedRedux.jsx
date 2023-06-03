import { createSelector } from "reselect";

const registerInfo = (state) => state.registerInfo;

const selectLoginInfo = (state) => state.loginInfo;

export const memoizedRegisterInfo = createSelector(
  [registerInfo],
  (registerInfo) => registerInfo
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
