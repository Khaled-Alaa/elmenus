import React from "react";
import { TUser, Role } from "../interfaces";

interface IUserContext {
  user: TUser;
  setUser: (user: TUser) => void;
}

const defaultState = {
  user: { id: 0, username: "", password: "", role: Role.USER },
  setUser: () => {},
};

const UserContext = React.createContext<IUserContext>(defaultState);
UserContext.displayName = "userContext";

export { UserContext };
