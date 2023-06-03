import {
  USER_REGISTER_RESET,
  USER_EMAIL_RESET,
  USER_VERIFY_RESET,
} from "../constants/userConstants";

/** 회원가입 state 초기화하는 Action */
export const registerResetAction = () => async (dispatch) => {
  dispatch({ type: USER_REGISTER_RESET });
};

/** 이메일 state 초기화하는 Action */
export const registerEmailResetAction = () => async (dispatch) => {
  dispatch({ type: USER_EMAIL_RESET });
};

/** 인증코드 state 초기화하는 Action */
export const registerCodeResetAction = () => async (dispatch) => {
  dispatch({ type: USER_VERIFY_RESET });
};
