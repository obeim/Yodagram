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
export const followUser = async (dispatch, id, token) => {
  dispatch({ type: "FOLLOW_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/users/follow`,
      { followID: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(data);
    dispatch({ type: "FOLLOW_SUCCESS", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
};
