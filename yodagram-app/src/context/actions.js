import axios from "axios";
export const loginUser = async (dispatch, loginInfo) => {
  dispatch({ type: "AUTH_REQUEST" });
  try {
    const { data } = await axios.post("/api/users/login", loginInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "AUTH_FAILED",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const registerUser = async (dispatch, registerInfo) => {
  dispatch({ type: "AUTH_REQUEST" });
  try {
    const { data } = await axios.post("/api/users/register", registerInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "AUTH_FAILED",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response,
    });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
};
