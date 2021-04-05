import { Component } from "react";

import Navbar from "react-bootstrap/Navbar";


import "./styles.scss";

class Footer extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" fixed="bottom">
        Copyright © 2021. elmenus
      </Navbar>
    );
  }
}

export default Footer;
