import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
  BUTTON_BLOCK_REQUEST,
  BUTTON_BLOCK_SUCCESS,
  BUTTON_BLOCK_FAIL,
} from "../constants/buttonConstants";
/**  유저 좋아요 && 저장 reducers */
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
/** 유저 차단  reducers */
export const blockUserReducers = (state = {}, action) => {
  switch (action.type) {
    case BUTTON_BLOCK_REQUEST:
      return { loading: true, ...state };

    case BUTTON_BLOCK_SUCCESS:
      return {
        loading: false,
        blockStatus: action.payload,
      };

    case BUTTON_BLOCK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
