import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
  BUTTON_BLOCK_REQUEST,
  BUTTON_BLOCK_SUCCESS,
  BUTTON_BLOCK_FAIL,
  BUTTON_SAVE_RESET,
} from "../constants/buttonConstants";
/**  유저 좋아요 && 저장 reducers */
export const saveUserReducers = (state = {}, action) => {
  switch (action.type) {
    case BUTTON_SAVE_REQUEST:
      return { loading: true, ...state, saveStatus: false };

    case BUTTON_SAVE_SUCCESS:
      return {
        loading: false,
        saveStatus: true,
      };

    case BUTTON_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case BUTTON_SAVE_RESET:
      return { loading: true, ...state, saveStatus: false };
    default:
      return state;
  }
};
/** 유저 차단  reducers */
export const blockUserReducers = (state = {}, action) => {
  switch (action.type) {
    case BUTTON_BLOCK_REQUEST:
      return { loading: true, ...state, blockStatus: false };

    case BUTTON_BLOCK_SUCCESS:
      return {
        loading: false,
        blockStatus: true,
      };

    case BUTTON_BLOCK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
