import {
  SAVE_LIST_REQUEST,
  SAVE_LIST_SUCCESS,
  SAVE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
} from "../constants/saveConstants";
import axios from "axios";
//action creator
//Redux thunk

/** 리스트 가졍 Action */
export const getSaveListAction = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_LIST_REQUEST });
    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
      },
    };

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/member/likes?page=${page}`,
      config
    );

    dispatch({ type: SAVE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SAVE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};

export const deleteSaveAction = (toId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_LIST_REQUEST });

    const {
      loginInfo: { sessfbs_ffa0934 },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
      },
    };

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/member/choice?toId=${toId}&signal=false`,
      toId,
      config
    );

    dispatch({ type: DELETE_LIST_SUCCESS, payload: data });
    // window.location.reload();
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.messge,
    });
  }
};
