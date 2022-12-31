import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import RestaurantPage from "./pages/RestaurantPage";
import LoginPage from "./pages/LoginPage";
import EditingPage from "./pages/EditingPage";
import NotFound from "./pages/404";
import { UserContext } from "./context/userContext";
import { Role } from "./interfaces";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const userContext = useContext(UserContext);

  const [user, setUser] = useState({
    id: 0,
    username: "",
    password: "",
    role: Role.USER,
  });

  useEffect(() => {
    if (userContext.user.role === Role.ADMIN) {
      setUser(userContext.user);
    }
  }, [userContext]);

  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Edit"
          element={
            user.role === Role.ADMIN ? <EditingPage /> : <Navigate to={"/"} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
