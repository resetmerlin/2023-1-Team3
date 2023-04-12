import {
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_LIST_FAIL,
} from "../constants/peopleConstants";
import axios from "axios";

//action creator
//Redux thunk

/** 이메일에 인증코드 전송 Action */
export const peopleListAction = () => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_LIST_REQUEST });

    const {
      loginInfo: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    const { data } = await axios.get(
      "http://138.2.127.153:8080/member/suggest",
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
