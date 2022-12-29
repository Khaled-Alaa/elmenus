import React from "react";
import { TUser } from "../interfaces";

interface IUserContext {
  user: TUser | {};
  setUser: (user: TUser) => void;
}

const defaultState = {
  user: {},
  setUser: () => {},
};

const UserContext = React.createContext<IUserContext>(defaultState);
UserContext.displayName = "userContext";

export { UserContext };
