import { createSelector } from "reselect";

const registerInfo = (state) => state.registerInfo;

const selectLoginInfo = (state) => state.loginInfo;
const selelctEmailInfo = (state) => state.emailInfo;

const selectCodeInfo = (state) => state.codeInfo;

export const memoizedRegisterInfo = createSelector(
  [registerInfo],
  (registerInfo) => {
    return registerInfo;
  }
);

export const memoizedCodeInfo = createSelector([selectCodeInfo], (codeInfo) => {
  return codeInfo;
});

export const memoizedEmailInfo = createSelector(
  [selelctEmailInfo],
  (emailInfo) => {
    return emailInfo;
  }
);

export const selectLoginToken = createSelector(
  [selectLoginInfo],
  (loginInfo) => {
    return loginInfo;
  }
);
