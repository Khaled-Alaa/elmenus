import { Component } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

class MainHeader extends Component {
  render() {
    return (
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
    );
  }
}

export default MainHeader;
