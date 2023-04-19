import {
  SAVE_LIST_REQUEST,
  SAVE_LIST_SUCCESS,
  SAVE_LIST_FAIL,
} from "../constants/saveConstants";
/** 유저들 불러오기 reducers */
export const getSaveListReducers = (state = {}, action) => {
  switch (action.type) {
    case SAVE_LIST_REQUEST:
      return { loading: true, ...state };

    case SAVE_LIST_SUCCESS:
      return {
        loading: false,
        saveListStatus: action.payload,
      };

    case SAVE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
