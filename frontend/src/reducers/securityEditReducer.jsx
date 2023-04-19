import {
  SECURITY_PASSWORD_FAIL,
  SECURITY_PASSWORD_SUCCESS,
  SECURITY_PASSWORD_REQUEST,
} from "../constants/securityEditConstants";

/** 유저들 불러오기 reducers */
export const passwordEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SECURITY_PASSWORD_REQUEST:
      return { loading: true, ...state };

    case SECURITY_PASSWORD_SUCCESS:
      return {
        loading: false,
        passwordEditStatus: action.payload,
      };

    case SECURITY_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
