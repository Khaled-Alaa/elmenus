# User Context 
The context is storing the logged user data to show the edit page for him if his role is admin. 

```JS
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const userContext = useContext(UserContext);

userContext.user // to read user data

userContext.setUser({
  id: number;
  username: string;
  password: string;
  role: Role.ADMIN || Role.USER;
}); // to set user data 

```