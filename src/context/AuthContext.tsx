import { createContext, useReducer } from "react";

type AuthState = {
  name: string;
};

type AuthAction = {
  type: string;
  payload: string;
};

type AuthProviderPrps = {
  children: React.ReactNode;
};

interface AuthContext {
  name: string;
  setUserName: (name: string) => void;
}

export const AuthContext = createContext<AuthContext>({
  name: "",
  setUserName: () => {},
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const defaultState = {
  name: "",
};

export const AuthProvider = ({ children }: AuthProviderPrps) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  const setUserName = (name: string) => {
    dispatch({ type: "SET_USER_NAME", payload: name });
  };

  return (
    <AuthContext.Provider value={{ ...state, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
