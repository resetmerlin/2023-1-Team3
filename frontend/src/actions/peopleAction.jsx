import {
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_LIST_FAIL,
} from "../constants/peopleConstants";
import axios from "axios";
//action creator
//Redux thunk

/** 리스트 가졍 Action */
export const peopleListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PEOPLE_LIST_REQUEST });

    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        access_token: ` ${sessfbs_ffa0934.accessToken}`,
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/member/suggest`,

      config
    );

    dispatch({ type: PEOPLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PEOPLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};
