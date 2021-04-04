import "./App.css";
import RestaurantPage from "./components/restaurantPage/index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <RestaurantPage />
    </div>
  );
}

export default App;

// import React from "react";

// import Button from "react-bootstrap/Button";

// import "./App.css";
// import MyVerticallyCenteredModal from "./components/popup/index";

// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// export default App;
