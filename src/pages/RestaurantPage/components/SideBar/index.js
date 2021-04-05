import DishData from "../dishdata/index";

import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.scss";

function SideBar(props) {
  const selectedCategory = function (name) {
    props.onSelectedCategory(name);
  };

  return (
    <div className="fluid-container">
      <Row>
        <Col sm={2}>
          <div id="aside-bar-container">
            <h4>Category</h4>
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey={props.category}
            >
              <Nav variant="pills" className="flex-column">
                {props.data.map((cataegory) => (
                  <Nav.Item>
                    <Nav.Link
                      eventKey={cataegory.name}
                      onClick={() => selectedCategory(cataegory.name)}
                    >
                      {cataegory.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Tab.Container>
          </div>
        </Col>
        <Col sm={6}>
          <DishData
            filteredDishes={props.filteredData}
            allCataegory={props.category}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SideBar;
