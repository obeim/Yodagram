let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";
export const initialState = {
  userInfo: user || null,
  loading: false,
  error: null,
  posts: [],
};
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return {
        ...initialState,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...initialState,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    case "AUTH_FAILED":
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    case "FOLLOW_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "FOLLOW_SUCCESS":
      return {
        ...initialState,
        userInfo: { ...initialState.userInfo, ...action.payload },
        loading: false,
      };
    case "POSTS_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "POSTS_SUCCESS":
      return {
        ...initialState,
        posts: action.payload,
        loading: false,
      };
    case "POSTS_FAIL":
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    case "POST_DELETE":
      return {
        ...initialState,
        posts: [
          ...initialState.posts.filter((post) => post._id !== action.payload),
        ],
      };

    case "LOGOUT":
      return {
        ...initialState,
        userInfo: null,
        loading: false,
      };
    default:
      return { initialState };
  }
};
