import React, { Component } from "react";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DishData from "../dishdata/index";

import "./styles.scss";

class restaurantpage extends Component {
  state = {
    data: [],
    filteredData: [],
    categoryName: "Appetizers",
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/categories")
      .then((resp) => {
        this.setState({
          data: resp.data,
          filteredData: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  selecetedCategory(categoryName) {
    axios
      .get(`http://localhost:4000/categories?name=${categoryName}`)
      .then((resp) => {
        this.setState({
          categoryName: categoryName,
          filteredData: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="page-container">
        <Navbar bg="light" variant="light" fixed="top">
          <Navbar.Brand href="#home">elmenus</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#login">LOGIN</Nav.Link>
            <Nav.Link href="#signup">SIGNUP</Nav.Link>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Nav>
        </Navbar>

        <div id="restaurant-data">
          <img
            src="https://i.ibb.co/7C0DtRJ/Test-Logo-Circle-black-transparent.png"
            alt="ButcherBurgerLogo"
            id="restaurant-logo"
          ></img>
          <h3>Butcher's Burger</h3>
        </div>
        <div className="fluid-container">
          <Row>
            <Col sm={2}>
              <div id="aside-bar-container">
                <h4>Category</h4>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey={this.state.categoryName}
                >
                  <Nav variant="pills" className="flex-column">
                    {this.state.data.map((cataegory) => (
                      <Nav.Item>
                        <Nav.Link
                          eventKey={cataegory.name}
                          onClick={() => this.selecetedCategory(cataegory.name)}
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
                filteredDishes={this.state.filteredData}
                allCataegory={this.state.categoryName}
              />
              {/*{console.log("filterded data :" + this.state.filteredData)}
              <div id="dishes-container">
                <h5>{this.state.categoryName}</h5>
                {this.state.filteredData.length !== 0
                  ? this.state.filteredData[0].items.map((item) => (
                      <div
                        onClick={() => alert("a70")}
                      >
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
              </div>*/}
            </Col>
          </Row>
        </div>

        <Navbar bg="light" variant="light" fixed="bottom">
          Copyright © 2021. elmenus
        </Navbar>
      </div>
    );
  }
}

export default restaurantpage;
