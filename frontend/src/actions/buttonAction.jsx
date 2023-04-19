import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
} from "../constants/buttonConstants";
import axios from "axios";

//action creator
//Redux thunk

/** 이메일에 인증코드 전송 Action */
export const saveUserAction = (toId, signal) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUTTON_SAVE_REQUEST });

    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    console.log(sessfbs_ffa0934.accessToken);

    const params = {
      toId: toId,
      signal: signal,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
      },
    };
    console.log(config);
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/member/choice?toId=${
        params.toId
      }&signal=${params.signal}`,
      params,
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
