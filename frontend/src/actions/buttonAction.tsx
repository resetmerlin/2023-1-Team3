import axios from 'axios';
import {
  BUTTON_SAVE_REQUEST,
  BUTTON_SAVE_SUCCESS,
  BUTTON_SAVE_FAIL,
  BUTTON_BLOCK_REQUEST,
  BUTTON_BLOCK_SUCCESS,
  BUTTON_BLOCK_FAIL,
} from '../constants/buttonConstants';

/** 유저 좋아요 && 저장 Action */
export const saveUserAction = (toId, signal) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUTTON_SAVE_REQUEST });

    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const params = {
      toId: toId,
      signal: signal,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        access_token: ` ${sessfbs_ffa0934.accessToken}`,
      },
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/member/choice?toId=${
        params.toId
      }&likeSignal=${params.signal}`,
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
/** 유저 차단 Action */
export const blockUserAction =
  (toId, blockSignal) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUTTON_BLOCK_REQUEST });

      const {
        loginInfo: { sessfbs_ffa0934 },
      } = getState();

      const params = {
        toId: toId,
        blockSignal: blockSignal,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          access_token: ` ${sessfbs_ffa0934.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/member/block?toId=${
          params.toId
        }&blockSignal=${params.blockSignal}`,
        params,
        config
      );

      dispatch({ type: BUTTON_BLOCK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: BUTTON_BLOCK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };
