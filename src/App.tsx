import { Navigate, Route, Routes } from "react-router";
import RestaurantPage from "./pages/RestaurantPage";
import LoginPage from "./pages/LoginPage";
import EditingPage from "./pages/EditingPage";
import NotFound from "./pages/404";
import "./App.css";
import { UserContext } from "./context/userContext";
import { useContext, useState } from "react";
import { Role } from "./interfaces";

function App() {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState({
    id: 0,
    username: "",
    password: "",
    role: Role.USER,
  });
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Edit"
          element={
            userContext.user.role === Role.ADMIN ? (
              <EditingPage />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
