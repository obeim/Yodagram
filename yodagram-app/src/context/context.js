import { createContext, useContext, useReducer } from "react";
import { initialState } from "./Reducers";
import { AuthReducer } from "./Reducers";
export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();
export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("authState context must be within AuthProvider");
  }
  return context;
};
export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("authDispatch context must be within auth provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
