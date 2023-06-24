import {
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_FAIL,
} from "../constants/messageConstants";
/**  유저 좋아요 && 저장 reducers */
export const messageReducers = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_GET_REQUEST:
      return { loading: true, ...state };

    case MESSAGE_GET_SUCCESS:
      return {
        loading: false,
        messageStatus: action.payload,
      };

    case MESSAGE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
