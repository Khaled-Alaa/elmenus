import { Route, Routes } from "react-router";
import RestaurantPage from "./pages/RestaurantPage";
import LoginPage from "./pages/LoginPage";
import EditingPage from "./pages/EditingPage";
import NotFound from "./pages/404";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RestaurantPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Edit" element={<EditingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
