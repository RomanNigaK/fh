import { createContext } from "react";

export const AuthCtx = createContext({
  token: null,
  userID: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
  info: [],
});
