import {
  SECURITY_PASSWORD_FAIL,
  SECURITY_PASSWORD_SUCCESS,
  SECURITY_PASSWORD_REQUEST,
} from "../constants/securityEditConstants";

/** 회원가입 Action */
export const passwordEditAction =
  (currentPassword, futurePassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: SECURITY_PASSWORD_REQUEST });

      const {
        loginInfo: { sessfbs_ffa0934 },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessfbs_ffa0934.accessToken}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/member/reset`,

        JSON.stringify(currentPassword, futurePassword),

        config
      );

      dispatch({ type: SECURITY_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SECURITY_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.messge,
      });
    }
  };
