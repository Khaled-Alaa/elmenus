import Layout from "./layout/index";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
