import {
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_RESET,
} from "../constants/peopleConstants";
/** 유저들 불러오기 reducers */
export const peopleListReducers = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_LIST_REQUEST:
      return { loading: true, ...state };

    case PEOPLE_LIST_SUCCESS:
      return {
        loading: false,
        peopleListStatus: action.payload,
      };

    case PEOPLE_LIST_FAIL:
      return { loading: false, error: action.payload };

    case PEOPLE_LIST_RESET:
      return {};

    default:
      return state;
  }
};
