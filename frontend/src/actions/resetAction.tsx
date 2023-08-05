import {
  SECURITY_GET_PERSONALINFO_RESET,
  SECURITY_PERSONALINFO_RESET,
  SECURITY_UPLOAD_PROFILE_RESET,
} from '../constants/securityEditConstants';
import {
  USER_REGISTER_RESET,
  USER_EMAIL_RESET,
  USER_VERIFY_RESET,
} from '../constants/userConstants';

import { MESSAGE_GET_HISTORY_RESET } from '../constants/messageConstants';
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

export const securityUserInfoResetAction = () => async (dispatch) => {
  dispatch({ type: SECURITY_GET_PERSONALINFO_RESET });
};

export const securityUserInfoEditResetAction = () => async (dispatch) => {
  dispatch({ type: SECURITY_PERSONALINFO_RESET });
};

export const securityUserProfileResetAction = () => async (dispatch) => {
  dispatch({ type: SECURITY_UPLOAD_PROFILE_RESET });
};

export const messageHistoryResetAction = () => async (dispatch) => {
  dispatch({ type: MESSAGE_GET_HISTORY_RESET });
};
