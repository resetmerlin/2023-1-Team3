import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
} from "../constants/buttonConstants";
import axios from "axios";

//action creator
//Redux thunk

/** 이메일에 인증코드 전송 Action */
export const saveUserAction = (users) => async (dispatch) => {
  try {
    dispatch({ type: BUTTON_SAVE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/member/choice`,

      JSON.stringify(users),
      config
    );

    dispatch({ type: BUTTON_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BUTTON_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};
