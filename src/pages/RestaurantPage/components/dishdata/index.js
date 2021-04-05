import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MyVerticallyCenteredModal from "../popup/index";

import "./styles.scss";
function DishData(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [itemData, setItemData] = React.useState(false);

  const dataView = function (item) {
    setModalShow(true);
    setItemData(item);
  };
  return (
    <div id="dishes-container">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={itemData}
      />

      <h5>{props.allCataegory}</h5>
      {props.filteredDishes.length !== 0
        ? props.filteredDishes[0].items.map((item) => (
            <div onClick={() => dataView(item)}>
              <Row>
                <Col sm={10}>
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                  <div>{item.price}</div>
                </Col>
                <Col sm={2}>
                  <img
                    src="https://i.ibb.co/92NGT9x/Depositphotos-71652087-original-min.jpg"
                    alt="ButcherBurgerLogo"
                    className="item-photo"
                  ></img>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <hr></hr>
                </Col>
              </Row>
            </div>
          ))
        : null}
    </div>
  );
}

export default DishData;
