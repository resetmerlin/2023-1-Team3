import { createSelector } from "reselect";

const selectLoginInfo = (state) => state.loginInfo;

export const selectLoginToken = createSelector(
  [selectLoginInfo],
  (loginInfo) => {
    return loginInfo;
  }
);
