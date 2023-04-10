import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
} from "../constants/buttonConstants";
/** 이메일 인증코드 전송 reducers */
export const saveUserReducers = (state = {}, action) => {
  switch (action.type) {
    case BUTTON_SAVE_REQUEST:
      return { loading: true, ...state };

    case BUTTON_SAVE_SUCCESS:
      return {
        loading: false,
        saveStatus: action.payload,
      };

    case BUTTON_SAVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
